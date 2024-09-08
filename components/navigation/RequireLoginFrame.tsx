import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

type RequireLoginScreenProps = {
    onLoginPress: () => void;
};

export const RequireLoginScreen: React.FC<RequireLoginScreenProps> = ({ onLoginPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.lottieContainer} >
                <LottieView style={styles.lottieView} source={require('@/assets/lottie/require-login.json')} autoPlay loop />
            </View>
            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
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
    lottieContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff00",
        height: 300,
        width: '100%'
    },
    lottieView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 200,
        width: '100%'
    },
    image: {
        width: '80%',
        height: 200,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});