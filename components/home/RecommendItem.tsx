import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { FoodModel } from '@/models/FoodModel';

interface RecommendedItemProps {
  item: FoodModel;
}

const { width } = Dimensions.get('window');
const itemWidth = width - 40 - 12; // Assuming 16px padding on each side

export const RecommendedItem: React.FC<RecommendedItemProps> = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image src={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        marginHorizontal: 16,
        marginVertical:5,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: '#FF6B6B',
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    }
});
