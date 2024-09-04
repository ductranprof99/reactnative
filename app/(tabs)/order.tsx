import { Modal, ScrollView, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { useEffect, useState } from 'react';
import { RequireLoginScreen } from '@/components/navigation/RequireLoginFrame';
import LoginScreen from '../layout/loginscreen';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router } from 'expo-router';

export default function OrderScreen() {
	const [user, setUser] = useState<User | null>(null)
	const [isLoginModalVisible, setLoginModalVisible] = useState(false);
	useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
		console.log("a")
    }, [user]);
	

	const handleSearchChange = (text: string) => {
		console.log('Search text:', text);
		// Implement your search logic here
	};

	const handleCartPress = () => {
		if (user !== null) {
			router.push('/layout/cartscreen')
		} else {
			setLoginModalVisible(true)
		}
	};

	const handleMenuPress = () => {
		router.push('/layout/menuscreen')
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
						<RequireLoginScreen onLoginPress={handleLoginPress}/>
					</View>
				) : (
					<View>
						<ScrollView>
							
						</ScrollView>
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
								<LoginScreen onClose={handleCloseLoginModal} isModal={true} />
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