import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import { Platform, StatusBar, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from '@/components/utils/ThemedText';
import { ThemedView } from '@/components/utils/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import * as ImagePicker from 'react-native-image-picker';
import { useSnackBars } from '@/components/utils/snack';
import { RegisterData, signUp } from '@/services/auth';


export default function RegisterScreen() {
    const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState<DateType | undefined>();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const { addAlert } = useSnackBars();
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: '',
        birthday: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        password: ''
    });
    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Nam',
            value: 'Nam',
            color: '#4CAF50'
        },
        {
            id: '2',
            label: 'Nữ',
            value: 'Nữ',
            color: '#4CAF50'
        },
        {
            id: '3',
            label: 'Khác',
            value: 'Khác',
            color: '#4CAF50'
        }
    ]), []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 1, // You can adjust the quality from 0 to 1
        });

        if (result.assets && result.assets.length > 0) {
            if (result.assets[0].uri !== undefined) {
                setImageUri(result.assets[0].uri); // Get the image URI
            }
        }
    };

    async function createNewAccount() {
        await signUp(registerData, () => {
            addAlert("Đăng ký thành công!!!");
            const timer = setTimeout(() => {
                router.back()
            }, 3000);
            return () => clearTimeout(timer);
        }, () => {
            addAlert("Đăng ký thất bại!");
        })
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
                    headerTitle: props => <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                    />,
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
                                placeholder="Trần Văn A"
                                placeholderTextColor="#999"
                                onEndEditing={(event) => { setRegisterData({ ...registerData, name: event.nativeEvent.text }) }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Ngày sinh</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="01/01/2000"
                                placeholderTextColor="#999"
                                readOnly
                                onPress={() => setOpenDate(true)}
                                value={registerData.birthday}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Giới tính</ThemedText>

                            <View style={styles.radioContainer}>
                                <RadioGroup
                                    radioButtons={radioButtons}
                                    onPress={(value) => {
                                        radioButtons.forEach(element => {
                                            if (element.id == value && element.value !== undefined) {
                                                setRegisterData({ ...registerData, gender: element.value })
                                            }
                                        });
                                        setSelectedId(value)

                                    }}
                                    selectedId={selectedId}
                                    layout='row'
                                />

                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Số điện thoại <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="0987654321"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                onEndEditing={(event) => { setRegisterData({ ...registerData, phone: event.nativeEvent.text }) }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Địa chỉ <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Quận 1, TP Hồ Chí Minh"
                                placeholderTextColor="#999"
                                // onChangeText={}
                                onEndEditing={(event) => { setRegisterData({ ...registerData, address: event.nativeEvent.text }) }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Hình đại diện</ThemedText>
                            {imageUri && (
                                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                            )}
                            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                                <ThemedText style={styles.imagePickerText}>Chọn hình</ThemedText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Email <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                onEndEditing={(event) => { setRegisterData({ ...registerData, email: event.nativeEvent.text }) }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label}>Mật khẩu <ThemedText style={styles.required}>(bắt buộc)</ThemedText></ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập thông tin"
                                placeholderTextColor="#999"
                                secureTextEntry
                                onChangeText={(text) => { setRegisterData({ ...registerData, password: text }) }}
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
                <Modal
                    visible={openDate}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setOpenDate(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setOpenDate(false)}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <DateTimePicker
                                        mode="single"
                                        date={dates}
                                        onChange={(params) => {
                                            const selectedDate = dayjs(params.date);
                                            setOpenDate(false)
                                            setDates(selectedDate)
                                            setRegisterData(
                                                {
                                                    ...registerData,
                                                    birthday: `${selectedDate.daysInMonth()}/${selectedDate.month()}/${selectedDate.year()}`
                                                }
                                            )
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 50, // Make the image circular if you want an avatar-style display
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    modalContent: {
        width: '90%', // Full width minus some padding
        height: "40%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});