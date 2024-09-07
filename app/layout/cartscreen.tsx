import { FoodModel } from "@/models/FoodModel";
import { useEffect, useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { OrderModel } from "@/models/OrderModel";
import { getCart, getFoodByListId } from "@/services/api";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "@/services/firebase";
import { CartItemModel } from "@/models/CartItemModel";
import { NoItemInCart } from "@/components/utils/NoItemInCart";
import { CartItem } from "@/components/items/CartItem";


function randomIntFromInterval(min: number = 30, max: number = 70) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

export const CartScreen: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [userEmail, setUserEmail] = useState('');
    const [shipAddress, setShipAddress] = useState('');
    const [shipDistancePrice, setShipDistancePrice] = useState(0);

    // Mock function to fetch cart items, replace with actual API call
    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser
        if (user !== null) {
            const email = user.email === null ? "" : user.email
            const fetchCartItems = async () => {
                const cartData = await getCart(email)
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
                        })
                        setCartItems(listCartItem)
                        setShipDistancePrice(randomIntFromInterval())
                    } else {
                        setShipDistancePrice(0)
                    }
                }
            };
            setUserEmail(email)
            fetchCartItems();
        }


    }, []);

    const updateQuantity = (id: string, newQuantity: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
        ));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + shipDistancePrice;

    const handlePlaceOrder = () => {
        const order: Omit<OrderModel, 'id'> = {
            order_date: new Date().toISOString(),
            product_ids: cartItems.map(item => item.id),
            product_quantities: cartItems.map(item => item.quantity),
            user_email: userEmail,
            total: totalPrice,
            ship_address: shipAddress,
            status: "Đang giao hàng"
        };

        console.log('Placing order:', order);
        // Here you would typically send this order to your backend
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
                {cartItems.length === 0 ?
                    <NoItemInCart />
                    : <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <CartItem item={item} updateQuantity={updateQuantity} />}
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
                        placeholder="Email (bắt buộc)"
                        value={userEmail}
                        onChangeText={setUserEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ giao hàng (bắt buộc)"
                        value={shipAddress}
                        onChangeText={setShipAddress}
                    />
                </View>
                {(cartItems.length !== 0) &&
                    <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                        <Text style={styles.orderButtonText}>Đặt hàng</Text>
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