import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useSnackBars } from '@/components/utils/snack';
import { FIREBASE_AUTH } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'expo-router';

interface LoginScreenProps {
    onClose: () => void;
    isModal: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onClose, isModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH
    const { addAlert } = useSnackBars();

    async function handleSignIn() {
        if (email.length < 1 || password.length < 8) {
            addAlert("Xin vui lòng nhập đầy đủ thông tin")
        } else {
            setLoading(true)
            try {
                const response = await signInWithEmailAndPassword(auth, email, password)
                if (response.user) {
                    onClose();
                } else {
                    addAlert("Đăng nhập thất bại!") 
                }
            } catch (error: any){
                console.log(error)
                addAlert("Đăng nhập thất bại!")
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            {
                isModal ?
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    : <></>
            }
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value: string) => { setEmail(value) }}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu"
                keyboardType="default"
                onChangeText={(value: string) => { setPassword(value) }}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} disabled={loading}>
                {
                    loading ?
                        <ActivityIndicator size="small" color="#111" /> :
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                }
            </TouchableOpacity>
            <Link push href="/helper/registerscreen" style={styles.registerButton} onPress={() => {
                if (isModal) {
                    onClose()
                }
            }}>
                <Text style={styles.registerButtonText}>Đăng ký tài khoản</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        alignSelf: 'center',
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