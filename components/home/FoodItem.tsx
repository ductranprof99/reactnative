import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FoodModel } from '@/models/FoodModel';

interface FoodItemProps {
    item: FoodModel;
    onTap: (item: FoodModel) => void;
}

const { width } = Dimensions.get('window');
const imageSize = 100; // Adjust this value as needed

export const FoodItem: React.FC<FoodItemProps> = ({ item, onTap }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)} >
            <View style={styles.viewWrapper}>
                <Image src={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 50, // Full width minus padding
    },
    viewWrapper: {
        width: "100%",
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 16,
        marginVertical: 8,
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
        width: imageSize,
        height: imageSize,
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#FF6B6B',
        fontWeight: '600',
    },
    description: {
        fontSize: 12,
        color: '#666',
    }
});