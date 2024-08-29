import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { LoginScreen } from '../helper/loginscreen';
import { RequireLoginScreen } from '../helper/needlogin';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';

export default function HistoryScreen() {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [user]);

	const [isLoginModalVisible, setLoginModalVisible] = useState(false);

	const handleSearchChange = (text: string) => {
		console.log('Search text:', text);
		// Implement your search logic here
	};

	const handleCartPress = () => {
		console.log('Cart pressed');
		// Navigate to cart or open cart modal
	};

	const handleMenuPress = () => {
		console.log('Menu pressed');
		// Open menu or navigate as needed
	};

	const handleLoginPress = () => {
		// TODO: if login success then set login modal equal true else do nothing
		// Load api if login success
		setLoginModalVisible(true);
	};

	const handleCloseLoginModal = () => {
		setLoginModalVisible(false);
	};

	return (
		<>
			<MainViewFrame
				onSearchChange={handleSearchChange}
				onCartPress={handleCartPress}
				onMenuPress={handleMenuPress}
			>
				{user == null ? (
					<View style={styles.container}>
						<RequireLoginScreen onLoginPress={handleLoginPress} />
					</View>
				) : (
					<View>
						<ScrollView></ScrollView>
					</View>
				)}
			</MainViewFrame>


			<Modal
				visible={isLoginModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={handleCloseLoginModal}
			>
				<TouchableWithoutFeedback onPress={handleCloseLoginModal}>
					<View style={styles.modalOverlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<LoginScreen onClose={handleCloseLoginModal} isModal={true}/>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0)', 
	},
	modalContent: {
		width: '100%', // Full width minus some padding
		height: "75%", 
	},
});