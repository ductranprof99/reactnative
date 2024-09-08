import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { useSnackBars } from '@/components/utils/snack';
import { FoodModel } from '@/models/FoodModel';
import { getFoodByListId, updateMultipleProductInCart } from '@/services/api';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { User } from 'firebase/auth';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FoodItemDetail: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [food, setFoodItems] = useState<FoodModel | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoadingAPI, setIsLoadingAPI] = useState(true);
    const [isWaiting, setIsWaiting] = useState(true);
    const foodId = String((useLocalSearchParams().id))
    const { addAlert } = useSnackBars();
    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        setUser(user);
        const getProductInfo = async () => {
            const list_product = await getFoodByListId([foodId]);
            if (list_product !== null) {
                setFoodItems(list_product[0]);
            }
            setIsLoadingAPI(false);
        }
        getProductInfo();
    }, [])

    const handleSearchChange = (text: string) => {
        console.log('Search text:', text);
        // Implement your search logic here
    };

    const handleCartPress = () => {
        if (user !== null) {
            router.push('/layout/cartscreen');
        } else {
            router.push('/(tabs)/account');
        }
    };

    const onAddToCart = async () => {
        if (user === null) {
            addAlert("Vui lòng đăng nhập để thêm vào giỏ hàng");
            router.navigate("/(tabs)/account");
        } else if (!isWaiting && food !== null && user !== null) {
            const mail = user.email ?? "";
            setIsWaiting(true);
            const req = await updateMultipleProductInCart(
                [food.id],
                [quantity],
                [food.price],
                mail
            );
            if (req) {
                addAlert("Thêm vào giỏ hàng thành công!!!")
            } else {
                addAlert("Thêm vào giỏ hàng thất bại!!!");
            }
        } else {
            addAlert("Hệ thống đang xử lý yêu cầu của bạn!!!");
        }
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <MainViewFrame
                onSearchChange={handleSearchChange}
                onCartPress={handleCartPress}
                onPush={true}
            >
                {
                    isLoadingAPI ?
                        <View style={styles.lottieContainer} >
                            <LottieView style={styles.lottieView} source={require('@/assets/lottie/food-loading.json')} autoPlay loop />
                        </View> :
                        (food === null ?
                            <View style={styles.lottieContainer} >
                                <LottieView style={styles.lottieView} source={require('@/assets/lottie/loading-error.json')} autoPlay loop />
                            </View>
                            :
                            <View style={styles.container}>
                                <Image src={food.image} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{food.name}</Text>
                                    <Text style={styles.price}>{food.price}d</Text>
                                    <Text style={styles.description}>{food.description}</Text>
                                </View>
                                <View style={styles.buySection}>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => setQuantity(quantity + 1)}>
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
                                        <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)
                }
            </MainViewFrame>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lottieContainer: {
        flex: 1,
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff00",
        height: 300,
        width: '100%'
    },
    lottieView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 300,
        width: '100%'
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginHorizontal: 20
    },
    infoContainer: {
        marginTop: 16,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: 'red',
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginTop: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        bottom: 0
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 16,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buySection: {
        position: 'absolute',  // Keeps it at the bottom
        bottom: 0,             // Align it to the bottom of the screen
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
    },
});

export default FoodItemDetail;