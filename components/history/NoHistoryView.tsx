import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

export const NoHistoryView: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/empty-history.jpg')} // Replace with your image path
                style={styles.image}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                router.navigate('/(tabs)')
            }}>
                <Text style={styles.buttonText}>Tiến hành đặt hàng nào</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '80%',
        height: 200,
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    buttonText: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: 'bold',
    },
});