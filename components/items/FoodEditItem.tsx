import { FoodModel } from '@/models/FoodModel';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface FoodEditItemProps {
    item: FoodModel;
    onQuantityChange: (id: string, quantity: number) => void;
}

const FoodEditItem: React.FC<FoodEditItemProps> = ({ item, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(item.id, newQuantity);
        }
    };

    return (
        <View style={styles.foodItem}>
            <Image src={item.image} style={styles.foodImage} />
            <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price.toLocaleString()}đ</Text>
                <Text style={styles.foodDescription} numberOfLines={3}>{item.description}</Text>
            </View>
            <View style={styles.quantityControl}>
                <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    foodItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    foodInfo: {
        flex: 1,
        marginLeft: 10,
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodPrice: {
        fontSize: 14,
        color: '#e74c3c',
        marginTop: 4,
    },
    foodDescription: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 4,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 50,
    },
    quantityButton: {
        width: 15,
        height: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#000000',
        fontSize: 13,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
    },
});

export default FoodEditItem;