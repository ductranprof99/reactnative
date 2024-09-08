import { ThemedText } from '@/components/utils/ThemedText';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
import { checkUserUpdateUserInfoValid, UserInfo } from '@/services/auth';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { useSnackBars } from '@/components/utils/snack';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs'

interface UserProfileScreenProps {
    profile: UserInfo;
    updateProfile: (updatedInfo: UserInfo) => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ profile, updateProfile }) => {
    const [updatedProfile, setProfile] = useState<UserInfo>(profile);
    const [selectedId, setSelectedId] = useState<string>(() =>{
        return profile.gender === "Nam" ? "1" : profile.gender === "Nữ" ? "2" : "3";
    });
    const [openDate, setOpenDate] = useState(false)
    const { addAlert } = useSnackBars();
    const [dates, setDates] = useState<DateType | undefined>();

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

    const handleUpdate = () => {
        // Implement update logic here
        if (!checkUserUpdateUserInfoValid(updatedProfile)) {
            addAlert("Xin vui lòng nhập đầy đủ thông tin!!!");
        } else if (updatedProfile.password.length < 8 && updatedProfile.password.length !== 0)  {
            addAlert("Xin vui lòng nhập mật khẩu hơn 8 ký tự!!!");
        } else {
            updateProfile(updatedProfile);
        }
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
                        source={require('@/assets/images/placeholder-avatar.png')}
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
                            value={updatedProfile.name}
                            onChangeText={(text) => setProfile({ ...profile, name: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <View style={styles.dateWrapperInput}>
                            <TextInput
                                style={styles.dateInput}
                                value={updatedProfile.birthday}
                                readOnly
                            />
                            <Pressable style={styles.calendarIconWrapper} onPress={() => setOpenDate(true)}>
                                <Image
                                    style={styles.calendarIcon}
                                    source={require("@/assets/images/calendar.png")}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Giới tính</Text>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={(value) => {
                                radioButtons.forEach(element => {
                                    if (element.id == value && element.value !== undefined) {
                                        setProfile({ ...updatedProfile, gender: element.value })
                                    }
                                });
                                setSelectedId(value)

                            }}
                            selectedId={selectedId}
                            layout='row'
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedProfile.phone}
                            onEndEditing={(event) => setProfile({ ...profile, phone: event.nativeEvent.text })}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa chỉ (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedProfile.address}
                            onEndEditing={(event) => setProfile({ ...profile, address: event.nativeEvent.text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email (bắt buộc)</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedProfile.email}
                            readOnly
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedProfile.password}
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
                                            setProfile({ ...profile, birthday: `${selectedDate.daysInMonth()}/${selectedDate.month()}/${selectedDate.year()}` }) 
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
        height: 40
    },
    dateWrapperInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        height: 40
    },
    dateInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontSize: 16,
    },
    calendarIconWrapper: {
        position: 'absolute',
        right: 10,
        width: 20,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
    },
    calendarIcon: {
        position: 'relative',
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

export default UserProfileScreen;