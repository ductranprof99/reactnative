import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/utils/ThemedText';
import { ThemedView } from '@/components/utils/ThemedView';

export default function RegisterScreen() {
  return (
    <>
      <Stack.Screen options={{headerShown: false}}/>
      <ThemedView style={styles.container}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
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

        <TouchableOpacity style={styles.registerButton}>
          <ThemedText style={styles.registerButtonText}>Đăng ký</ThemedText>
        </TouchableOpacity>

        <Link href="/helper/loginscreen" style={styles.loginLink}>
          <ThemedText style={styles.loginLinkText}>Quay về đăng nhập</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
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