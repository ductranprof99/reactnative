import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import LoginScreen from '../helper/loginscreen';
import { useAuth } from '@/context/auth';
import { RequireLoginScreen } from '../helper/requirelogin';

const { width } = Dimensions.get('window');
export default function HistoryScreen() {
	const { user } = useAuth();
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
							<View>
								<LoginScreen onClose={handleCloseLoginModal} />
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
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
});