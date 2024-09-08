import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { router, Stack } from 'expo-router';
import FoodEditItem from '@/components/items/FoodEditItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { FoodModel, SelectedItem } from '@/models/FoodModel';
import { BottomDialog } from '@/components/utils/BottomModal';
import { useLocalSearchParams } from 'expo-router';
import { getFoodByCategory, updateMultipleProductInCart } from '@/services/api';
import { FIREBASE_AUTH } from '@/services/firebase';
import { User } from 'firebase/auth';
import { useSnackBars } from '@/components/utils/snack';

export const Category: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodModel[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [showBottomDialog, setShowBottomDialog] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { addAlert } = useSnackBars();
    const local = useLocalSearchParams();
    const banner = String(local.banner);
    const categoryName = String(local.categoryName)
    const categoryId = String(local.id);

    useEffect(() => {
        setUser(FIREBASE_AUTH.currentUser)
        const getFoodRequest = getFoodByCategory(categoryId)
        getFoodRequest.then((listFood) => {
            setFoodItems(listFood)
        }).catch((error) => {
            console.log(error)
        });

        if (selectedItems.length > 0) {
            setShowBottomDialog(true);
        } else {
            setShowBottomDialog(false);
        }
    }, [selectedItems]);

    const handleSearchChange = (text: string) => {
        console.log('Search text:', text);
        // Implement your search logic here
    };

    const handleCartPress = () => {
        if (user !== null) {
			router.push('/layout/cartscreen')
		} else {
			router.navigate('/(tabs)/account')
		}
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        
        setSelectedItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === id);
            if (existingItemIndex !== -1) {
                // Item already exists in the selected items
                if (quantity > 0) {
                    // Update the quantity
                    return prevItems.map(item =>
                        item.id === id ? { ...item, quantity } : item
                    );
                } else {
                    // Remove the item if quantity is 0
                    return prevItems.filter(item => item.id !== id);
                }
            } else if (quantity > 0) {
                // Add new item
                const newItem = foodItems.find(item => item.id === id);
                if (newItem) {
                    return [...prevItems, { ...newItem, quantity }];
                }
            }
            return prevItems; // No changes if item not found or quantity is 0 for new item
        });
    };

    const handleCreateOrder = async () => {
        if (user !== null) {
            if (!isLoading) {
                setIsLoading(true);
                var prod_ids = []
                var quantities = []
                var prices = []
                for (let index = 0; index < selectedItems.length; index++) {
                    prod_ids.push(selectedItems[index].id)
                    quantities.push(selectedItems[index].quantity)
                    prices.push(selectedItems[index].price)
                }
                let req = await updateMultipleProductInCart(prod_ids, quantities, prices, user.email || '')
                if (req) {
                    addAlert("Thêm hàng vào giỏ thành công")
                    setSelectedItems([])
                } else {
                    addAlert("Thêm hàng vào giỏ thất bại")
                }
                setIsLoading(false);
            }
        } else {
            addAlert("Vui lòng đăng nhập để mua sản phẩm")
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
                <View style={styles.banner}>
                    <Image
                        src={banner}
                        style={styles.bannerImage}
                    />
                    <View style={styles.textBannerBackground}>
                        <Text style={styles.bannerText}>{categoryName}</Text>
                    </View>
                </View>
                {(foodItems.length == 0) ?
                    <ActivityIndicator size="large" color="#00ff00" />
                    :
                    <ScrollView style={styles.scrollView}>
                        {foodItems.map((item) => (
                            <FoodEditItem
                                key={item.id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRefreshChoose={selectedItems}
                            />
                        ))}
                    </ScrollView>
                }
                {showBottomDialog && (
                    <BottomDialog
                        selectedItems={selectedItems}
                        onPressOrder={() => handleCreateOrder()}
                        onClose={() => setShowBottomDialog(false)}
                        isLoading={isLoading}
                    />
                )}
            </MainViewFrame>
        </>
    );
};

const styles = StyleSheet.create({
    banner: {
        height: 150,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    textBannerBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        width: 'auto',
        height: 'auto',
        backgroundColor: "rgba(255,255,255, 0.81)"
    },
    bannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        textShadowRadius: 10,
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 20
    },

});

export default Category;