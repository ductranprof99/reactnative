import FoodEditItem from '@/components/items/FoodEditItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { FoodModel } from '@/models/FoodModel';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function CategoryScreen() {
    const [foodItems, setFoodItems] = useState<FoodModel[]>([]);

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
            <Stack.Screen name='categoryscreen' options={{ headerShown: false }} />
            <MainViewFrame
                onSearchChange={handleSearchChange}
				onCartPress={handleCartPress}
				onMenuPress={handleMenuPress}
            >
            <View style={styles.banner}>
                <Image
                    source={require("@/assets/demo/banner_category.png")} // TODO
                    style={styles.bannerImage}
                />
                <Text style={styles.bannerText}>Category Name</Text>
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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    bannerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scrollView: {
        flex: 1,
    },
});
