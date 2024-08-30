import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import FoodEditItem from '@/components/items/FoodEditItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { FoodModel, testCategoryItem } from '@/models/FoodModel';
import { BottomDialog, SelectedItem } from '@/components/utils/BottomModal';

export const CategoryScreen: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodModel[]>(testCategoryItem);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [showBottomDialog, setShowBottomDialog] = useState(false);

    useEffect(() => {
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
        console.log('Cart pressed');
        // Navigate to cart or open cart modal
    };

    const handleMenuPress = () => {
        console.log('Menu pressed');
        // Open menu or navigate as needed
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

    }

    return (
        <>
            <Stack.Screen />
            <MainViewFrame
                onSearchChange={handleSearchChange}
                onCartPress={handleCartPress}
                onMenuPress={handleMenuPress}
                onPush={true}
            >
                <View style={styles.banner}>
                    <Image
                        source={require("@/assets/demo/banner_category.png")}
                        style={styles.bannerImage}
                    />
                    <View style={styles.textBannerBackground}>
                        <Text style={styles.bannerText}>Category Name</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    {foodItems.map((item) => (
                        <FoodEditItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </ScrollView>
                {showBottomDialog && (
                    <BottomDialog
                        selectedItems={selectedItems}
                        onPressOrder={() => handleCreateOrder()}
                        onClose={() => setShowBottomDialog(false)}
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

export default CategoryScreen;