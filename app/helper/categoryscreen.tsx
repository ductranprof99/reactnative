import FoodEditItem from '@/components/items/FoodEditItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { FoodModel, testCategoryItem } from '@/models/FoodModel';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export const CategoryScreen: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodModel[]>(testCategoryItem);

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
        // TODO
        console.log(`Item ${id} quantity changed to ${quantity}`);
    };

    return (
        <>
            <Stack.Screen/>
            <MainViewFrame
                onSearchChange={handleSearchChange}
                onCartPress={handleCartPress}
                onMenuPress={handleMenuPress}
                onPush={true}
            >
                <View style={styles.banner}>
                    <Image
                        source={require("@/assets/demo/banner_category.png")} // TODO
                        style={styles.bannerImage}
                    />
                    <View style={styles.textBannerBackground}>
                        <Text style={styles.bannerText}>Category Nfasdfame</Text>
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
    textBannerBackground : {
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