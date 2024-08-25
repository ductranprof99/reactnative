import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '@/context/auth';
import { useSnackBars } from '@/context/snack';

const LoginScreen = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();
    const { addAlert } = useSnackBars();

    function handleSignIn() {
        if (name.length < 1 || password.length < 8) {
            addAlert("Please type name and password")
        } else {
            signIn(name, password);
        }
    }

    function navigateToRegisterScreen() {

    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>FOODY</Text>
            <Text style={styles.subtitle}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value: string) => {setName(value)}}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu"
                keyboardType="default"
                onChangeText={(value: string) => {setPassword(value)}}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={navigateToRegisterScreen}>
                <Text style={styles.registerButtonText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700', // Golden color for FOODY
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#4CAF50', // Green color
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        width: '100%',
    },
    registerButtonText: {
        color: '#4CAF50', // Green color
        fontSize: 16,
    },
});

export default LoginScreen;