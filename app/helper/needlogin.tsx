import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

type RequireLoginScreenProps = {
  onLoginPress: () => void;
};

export const RequireLoginScreen: React.FC<RequireLoginScreenProps> = ({ onLoginPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/requirelogin.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
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