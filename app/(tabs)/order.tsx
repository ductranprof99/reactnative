import { Modal, ScrollView, StyleSheet, View, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { useEffect, useState } from 'react';
import { RequireLoginScreen } from '@/components/navigation/RequireLoginFrame';
import LoginScreen from '../layout/loginscreen';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
import { router } from 'expo-router';
import { OrderModel } from '@/models/OrderModel';
import { getShippingOrder } from '@/services/api';
import LottieView from 'lottie-react-native';
import { NoOrderView } from '@/components/order/NoOrderView';
import { useIsFocused } from "@react-navigation/native";

export default function OrderScreen() {
	const [user, setUser] = useState<User | null>(null)
	const [isLoginModalVisible, setLoginModalVisible] = useState(false);
	const [listShippingOrder, setListShippingOrder] = useState<OrderModel[]>([])
	const [isLoadAPI, setIsLoadAPI] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			onAuthStateChanged(FIREBASE_AUTH, (user) => {
				setUser(user)
			});
			const getOrders = async () => {
				const listOrder = await getShippingOrder();
				setListShippingOrder(listOrder);
				setIsLoadAPI(false);
			}
			getOrders();
		}
	}, [user, isFocused]);


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
			>
				{user == null ? (
					<View style={styles.container}>
						<RequireLoginScreen onLoginPress={handleLoginPress} />
					</View>
				) : (
					isLoadAPI ?
						<View style={styles.lottieContainer} >
							<LottieView style={styles.lottieView} source={require('@/assets/lottie/shipping-loading.json')} autoPlay loop />
						</View>
						: (
							listShippingOrder.length === 0 ?
								<NoOrderView />
								: <View>
									<View style={styles.scrollVerticalSection}>
										<Text style={styles.sectionTitle}>Đơn hàng</Text>
										<FlatList
											data={listShippingOrder}
											renderItem={({ item }) =>
												<></>
											}
											keyExtractor={(item) => item.id}
											scrollEnabled={false}
										/>
									</View>
								</View>
						)
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
	lottieContainer: {
		flex: 1,
		padding: 0,
		margin: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#ffffff00",
		height: 300,
		width: '100%'
	},
	lottieView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		height: 300,
		width: '100%'
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
		fontSize: 30,
		fontWeight: 'bold',
		color: "#4CAF50",
		marginBottom: 16,
		paddingHorizontal: 16,
	},
});