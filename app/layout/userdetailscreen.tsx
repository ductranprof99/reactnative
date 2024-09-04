import { ThemedText } from '@/components/utils/ThemedText';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

interface UserProfile {
    name: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    phoneNumber: string;
    address: string;
    email: string;
    password: string;
}

export const UserProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Nguyễn Yến Uyển',
        dateOfBirth: '2000/02/22',
        gender: 'female',
        phoneNumber: '0987654321',
        address: '343 pham Ngũ Lão',
        email: 'food@gmail.com',
        password: '',
    });

    const handleUpdate = () => {
        // Implement update logic here
        console.log('Profile updated:', profile);
    };

    async function handleSignOut() {
        FIREBASE_AUTH.signOut()
        router.navigate("/")
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Tài khoản</Text>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: 'https://example.com/placeholder-image.jpg' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Text style={styles.changePhotoText}>Thay ảnh</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={profile.name}
                            onChangeText={(text) => setProfile({ ...profile, name: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <View style={styles.dateInput}>
                            <TextInput
                                style={styles.input}
                                value={profile.dateOfBirth}
                                onChangeText={(text) => setProfile({ ...profile, dateOfBirth: text })}
                            />
                            <Image
                                style={styles.calendarIcon}
                                source={require("@/assets/images/calendar.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Giới tính</Text>
                        <View style={styles.genderOptions}>
                            <TouchableOpacity
                                style={[styles.genderOption, profile.gender === 'male' && styles.genderOptionSelected]}
                                onPress={() => setProfile({ ...profile, gender: 'male' })}
                            >
                                <Text>Nam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderOption, profile.gender === 'female' && styles.genderOptionSelected]}
                                onPress={() => setProfile({ ...profile, gender: 'female' })}
                            >
                                <Text>Nữ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderOption, profile.gender === 'other' && styles.genderOptionSelected]}
                                onPress={() => setProfile({ ...profile, gender: 'other' })}
                            >
                                <Text>Khác</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={profile.phoneNumber}
                            onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa chỉ (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={profile.address}
                            onChangeText={(text) => setProfile({ ...profile, address: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={profile.email}
                            onChangeText={(text) => setProfile({ ...profile, email: text })}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            value={profile.password}
                            onChangeText={(text) => setProfile({ ...profile, password: text })}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.updateButtonText}>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOutLink} onPress={handleSignOut}>
                        <ThemedText style={styles.signOutLinkText}>Đăng xuất</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginVertical: 20,
        marginLeft: 15,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoButton: {
        marginTop: 10,
    },
    changePhotoText: {
        color: '#4CAF50',
        textDecorationLine: 'underline',
    },
    form: {
        paddingHorizontal: 15,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#4CAF50',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        position: 'absolute',
        right: 10,
        width: 20,
        height: 20
    },
    genderOptions: {
        flexDirection: 'row',
    },
    genderOption: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    genderOptionSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    updateButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signOutLink: {
        marginTop: 15,
        padding: 15,
        alignItems: 'center',
    },
    signOutLinkText: {
        color: '#4CAF50',
        fontSize: 16,
    },
});

export default UserProfileScreen;