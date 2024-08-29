import React from 'react';
import { Stack } from 'expo-router';
import { Platform, StatusBar, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/utils/ThemedText';
import { ThemedView } from '@/components/utils/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
function LogoTitle() {
    return (
        <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
        />
    );
}

export default function RegisterScreen() {
    const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";

    async function createNewAccount() {
        // TODO
    }

    function navigateToPreviousScreen() {
        router.back()
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => {
                        return <Ionicons
                            name={backIcon}
                            size={25}
                            color="black"
                            onPress={() => router.back()}
                        />
                    },
                    headerTitle: props => <LogoTitle />,
                }}
            />
            <SafeAreaView style={styles.android_safeview}>
                <ScrollView>
                    <ThemedView style={styles.container}>
                        <ThemedText style={styles.title}>Đăng ký</ThemedText>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Họ và tên <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Ngày sinh</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Giới tính</ThemedText>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity style={styles.radioButton}>
                                    <View style={styles.radioOuterCircle}>
                                        <View style={styles.radioInnerCircle} />
                                    </View>
                                    <ThemedText style={styles.radioLabel}>Nam</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.radioButton}>
                                    <View style={styles.radioOuterCircle}>
                                        <View style={styles.radioInnerCircle} />
                                    </View>
                                    <ThemedText style={styles.radioLabel}>Nữ</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.radioButton}>
                                    <View style={styles.radioOuterCircle}>
                                        <View style={styles.radioInnerCircle} />
                                    </View>
                                    <ThemedText style={styles.radioLabel}>Khác</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Số điện thoại <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="0987654321"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Địa chỉ <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Hình đại diện</ThemedText>
                            <TouchableOpacity style={styles.imagePickerButton}>
                                <ThemedText style={styles.imagePickerText}>Chọn hình</ThemedText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Email <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Mật khẩu <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={createNewAccount}>
                            <ThemedText style={styles.registerButtonText}>Đăng ký</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginLink} onPress={navigateToPreviousScreen}>
                            <ThemedText style={styles.loginLinkText}>Quay về đăng nhập</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    android_safeview: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        margin: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#4CAF50',
    },
    required: {
        color: '#FF0000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuterCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
    },
    radioLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    imagePickerButton: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    imagePickerText: {
        color: '#000',
    },
    registerButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 15,
        padding: 15,
        alignItems: 'center',
    },
    loginLinkText: {
        color: '#4CAF50',
        fontSize: 16,
    },
});