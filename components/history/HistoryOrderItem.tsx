import { FoodModel } from '@/models/FoodModel';
import { OrderModel } from '@/models/OrderModel';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

interface HistoryOrderItemProps {
    order: OrderModel;
    onViewInvoice: (orderId: string) => void;
    onViewOrder: (orderId: string) => void;
}

export const HistoryOrderItem: React.FC<HistoryOrderItemProps> = ({ order, onViewInvoice, onViewOrder }) => {
    const [foodItems, setFoodItems] = useState<FoodModel[]>([])
    useEffect(() => {
		
	}, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.label}>Order Number:</Text>
                    <Text style={styles.value}>#{order.product_ids[0]}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Order Date:</Text>
                    <Text style={styles.value}>{order.order_date}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Total Amount:</Text>
                    <Text style={styles.value}>${order.total.toFixed(2)}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={[styles.value, styles.status]}>{order.status}</Text>
                </View>
            </View>
            
            <View style={styles.buttonContainer}>
                {
                    (order.status === "Đang giao hàng") &&
                    <>
                        <Text style={styles.estimatedDelivery}>{getEstimatedDelivery(order.order_date)}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => onViewInvoice(order.id)}>
                            <Text style={styles.buttonText}>Xem hoá đơn đặt hàng</Text>
                        </TouchableOpacity>
                    </>
                }
                {
                   (order.status === "Đã giao") && 
                   <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => onViewOrder(order.id)}>
                        <Text style={[styles.buttonText, styles.primaryButtonText]}>View Order</Text>
                    </TouchableOpacity>
                }
                
            </View>
            {
                (order.status === "Đang giao hàng") &&
                <Text style={styles.estimatedDelivery}>{getEstimatedDelivery(order.order_date)}</Text>
            }
            
            <FlatList
                data={foodItems}
                renderItem={({ item, index }) => 
                    <View style={styles.productItem}>
                        <Image
                            src={item.image}
                            style={styles.productImage}
                        />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>Món ăn {index + 1}:</Text>
                            <Text style={styles.productDescription}>{item.description}</Text>
                            <Text style={styles.productDetails}>
                                Số lượng: {order.product_quantities[index]}
                            </Text>
                            <Text style={styles.productDetails}>
                                Tình trạng: {order.status}
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.link}>Xem đơn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                keyExtractor={(item) => item.id}
                scrollEnabled
            />
        </View>
    );
};

const getEstimatedDelivery = (orderDate: string) => {
    // This is a placeholder function. You should implement proper date calculation here.
    return 'Tue, May 7 - Mon May 13';
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#666',
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    status: {
        color: '#FF8C00',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonText: {
        fontSize: 14,
        color: '#333',
    },
    primaryButton: {
        backgroundColor: '#4B0082',
        borderColor: '#4B0082',
    },
    primaryButtonText: {
        color: 'white',
    },
    estimatedDelivery: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 4,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productDetails: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    link: {
        fontSize: 14,
        color: '#4B0082',
        textDecorationLine: 'underline',
    },
});

export default HistoryOrderItem;