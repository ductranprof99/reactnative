import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { LoginScreen } from '@/app/layout/loginscreen';
import { RequireLoginScreen } from '@/components/navigation/RequireLoginFrame';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router } from 'expo-router';
import { OrderModel } from '@/models/OrderModel';
import HistoryOrderItem from '@/components/history/HistoryOrderItem';
import { NoHistoryView } from '@/components/history/NoHistoryView';

export default function HistoryScreen() {
	const [user, setUser] = useState<User | null>(null)
	const [isLoginModalVisible, setLoginModalVisible] = useState(false);
	const [listHistoryOrder, setListHistoryOrder] = useState<OrderModel[]>([])
	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user)
		})
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

	const onViewShippingOrder = async (orderId: string) => {

	}

	const onViewHistoryOrder = async (orderId: string) => {

	}

	return (
		<>
			<MainViewFrame
				onSearchChange={handleSearchChange}
				onCartPress={handleCartPress}
				onMenuPress={handleMenuPress}
			>
				{user === null ? (
					<View style={styles.container}>
						<RequireLoginScreen onLoginPress={handleLoginPress} />
					</View>
				) : (
					(listHistoryOrder.length === 0) ? 
					<NoHistoryView/>
					:
					<View>
						<View style={styles.scrollVerticalSection}>
							<Text style={styles.sectionTitle}>Món ăn thường ngày</Text>
							<FlatList
								data={listHistoryOrder}
								renderItem={({ item }) =>
									<HistoryOrderItem
										order={item}
										onViewInvoice={onViewShippingOrder}
										onViewOrder={onViewHistoryOrder}
									/>
								}
								keyExtractor={(item) => item.id}
								scrollEnabled={false}
							/>
						</View>
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
	scrollVerticalSection: {
		padding: 10,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingHorizontal: 16,
	},
});


