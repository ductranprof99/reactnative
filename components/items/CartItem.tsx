import { CartItemModel } from "@/models/CartItemModel";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';  // Using MaterialIcons for the delete icon

interface CartItemProps {
    item: CartItemModel;
    updateQuantity: (id: string, newQuantity: number, price: number) => void;
    deleteItem: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, deleteItem }) => {
    const [quantity, setQuantity] = useState<number>(item.quantity)

    return (
        <View key={item.id} style={styles.cartItem}>
            <Image src={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} đ</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity
                        onPress={() => {
                            const newQuant = item.quantity - 1;
                            updateQuantity(item.id, newQuant, item.price);
                            setQuantity(newQuant);
                        }}
                    >
                        <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            const newQuant = item.quantity + 1;
                            updateQuantity(item.id, newQuant, item.price);
                            setQuantity(newQuant);
                        }}
                    >
                        <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Delete button */}
            <TouchableOpacity onPress={deleteItem} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',  // Align items vertically centered
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 8,
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 8,
    },
    deleteButton: {
        padding: 8,
    },
});
