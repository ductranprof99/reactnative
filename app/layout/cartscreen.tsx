import { FoodModel } from "@/models/FoodModel";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { OrderModel } from "@/models/OrderModel";
import { getCart, getFoodByListId, updateCurrentCart } from "@/services/api";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "@/services/firebase";
import { CartItemModel } from "@/models/CartItemModel";
import { NoItemInCart } from "@/components/utils/NoItemInCart";
import { CartItem } from "@/components/items/CartItem";
import { useSnackBars } from "@/components/utils/snack";
import { getUserInfo } from "@/services/auth";

function randomIntFromInterval(min: number = 30, max: number = 70) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

export const CartScreen: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [isLoadAPI, setIsLoadAPI] = useState(true)
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [shipAddress, setShipAddress] = useState('');
    const [shipDistancePrice, setShipDistancePrice] = useState(0);
    const [allowEdit, setAllowEdit] = useState(true)
    const { addAlert } = useSnackBars();

    // Mock function to fetch cart items, replace with actual API call
    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser
        if (user !== null) {
            const email = user.email === null ? "" : user.email
            const fetchCartItems = async () => {
                const userInfo = await getUserInfo(email);
                setUserPhone(userInfo.phone);
                const cartData = await getCart(email);
                if (cartData !== null) {
                    setShipAddress(cartData.ship_address);
                    if (cartData.product_ids.length !== 0) {
                        const listProduct: FoodModel[] = await getFoodByListId(cartData.product_ids);
                        const listCartItem: CartItemModel[] = listProduct.map((item) => {
                            return {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                isRecommend: item.isRecommend,
                                description: item.description,
                                image: item.image,
                                category: item.category,
                                quantity: cartData.product_quantities[cartData.product_ids.indexOf(item.id)]
                            }
                        });
                        setCartItems(listCartItem);
                        setShipDistancePrice(randomIntFromInterval());
                    } else {
                        setShipDistancePrice(0);
                    }
                }
                setIsLoadAPI(false)
            };
            setUserEmail(email);
            fetchCartItems();
        }


    }, []);

    const updateQuantity = async (id: string, newQuantity: number, price: number) => {
        if (allowEdit) {
            setAllowEdit(false);
            const req = await updateCurrentCart(id, Math.max(0, newQuantity), price, userEmail, shipAddress === '' ? undefined : shipAddress);
            
            if (req) {
                // Remove the item if newQuantity is 0, otherwise update the quantity
                setCartItems(cartItems => 
                    newQuantity === 0 
                    ? cartItems.filter(item => item.id !== id) // Remove item
                    : cartItems.map(item => 
                        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
                    )
                );
                addAlert("Cập nhật số lượng món ăn thành công!!!");
                setAllowEdit(true);
            } else {
                addAlert("Cập nhật số lượng món ăn thất bại!!!");
                setAllowEdit(true);
            }
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + shipDistancePrice;

    const handlePlaceOrder = async () => {
        if (allowEdit) {
            setAllowEdit(false)
            const order: Omit<OrderModel, 'id' | 'status'> = {
                order_date: new Date().toISOString(),
                product_ids: cartItems.map(item => item.id),
                product_quantities: cartItems.map(item => item.quantity),
                user_email: userEmail,
                total: totalPrice,
                ship_address: shipAddress
            };

            console.log('Placing order:', order);
            // Here you would typically send this order to your backend
            setAllowEdit(true)
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => {
                        return <Ionicons
                            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp"}
                            size={25}
                            color="black"
                            onPress={() => router.back()}
                        />
                    },
                    headerTitle: props => <Text style={styles.header}>Giỏ hàng</Text>,
                }}
            />
            <ScrollView style={styles.container}>
                {isLoadAPI? 
                <ActivityIndicator size="large" color="#111" />
                :cartItems.length === 0 ?
                    <NoItemInCart />
                    : <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <CartItem item={item} updateQuantity={updateQuantity} deleteItem={() => updateQuantity(item.id, 0, item.price)} />}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                }
                <View style={styles.summary}>
                    <Text style={styles.totalText}>Tổng cộng: {totalPrice} đ</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.formLabel}>Thông tin người nhận hàng</Text>
                    <TextInput
                        style={styles.input}
                        value={userEmail}
                        readOnly
                    />
                    <TextInput
                        style={styles.input}
                        value={userPhone}
                        readOnly
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ giao hàng (bắt buộc)"
                        value={shipAddress}
                        editable={allowEdit}
                        onChangeText={setShipAddress}
                    />
                </View>
                {(cartItems.length !== 0) &&
                    <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                        { allowEdit ?
                            <Text style={styles.orderButtonText}>Đặt hàng</Text>
                            : <ActivityIndicator size="small" color="#111" />
                        }
                    </TouchableOpacity>
                }
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    summary: {
        marginTop: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tipButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
    selectedTipButton: {
        backgroundColor: 'lightblue',
    },
    tipButtonText: {
        fontSize: 14,
    },
    form: {
        marginTop: 24,
    },
    formLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    orderButton: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    orderButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CartScreen;