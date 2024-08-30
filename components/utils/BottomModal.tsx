import { FoodModel } from "@/models/FoodModel";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface SelectedItem extends FoodModel {
    quantity: number;
}

export const BottomDialog: React.FC<{ selectedItems: SelectedItem[], onPressOrder?: () => void, onClose?: () => void }> = ({ selectedItems, onPressOrder, onClose }) => {
    var total: number = selectedItems.reduce((accumulator, currentValue) => {
        return Number(currentValue.price) * currentValue.quantity + accumulator
    }, 0);
    return (
    <View style={styles.bottomDialog}>
        <Text style={styles.bottomDialogTitle}>Bạn đã đặt {selectedItems.length} món ăn</Text>
        {}
        <Text style={styles.bottomDialogTotal}>Tổng cộng: {total.toLocaleString()}đ</Text>
        <TouchableOpacity style={styles.bottomDialogButton} onPress={onPressOrder}>
            <Text style={styles.bottomDialogButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    bottomDialog: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bottomDialogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bottomDialogTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bottomDialogButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    bottomDialogButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})