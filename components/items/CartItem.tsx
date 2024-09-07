import { CartItemModel } from "@/models/CartItemModel";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
    item: CartItemModel;
    updateQuantity: (id: string, newQuantity: number) => void
}
export const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity }) => {
    const [quantity, setQuantity] = useState<number>(item.quantity)
    return <View key={item.id} style={styles.cartItem}>
        <Image src={item.image} style={styles.itemImage} />
        <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}đ</Text>
            <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => {
                    const newQuant = item.quantity - 1
                    updateQuantity(item.id, newQuant)
                    setQuantity(newQuant)
                }}
                >
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={() => {
                    const newQuant = item.quantity + 1
                    updateQuantity(item.id, newQuant)
                    setQuantity(newQuant)
                }
                }>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View >;
}

const styles = StyleSheet.create({ 
    cartItem: {
        flexDirection: 'row',
        marginBottom: 16,
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
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 8,
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 8,
    },
})