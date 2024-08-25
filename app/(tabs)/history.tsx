import { ScrollView, StyleSheet, View } from 'react-native';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';

export default function HistoryScreen() {
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

	return (
		<MainViewFrame
			onSearchChange={handleSearchChange}
			onCartPress={handleCartPress}
			onMenuPress={handleMenuPress}
		>
			<View>
				<ScrollView>

				</ScrollView>
			</View>
		</MainViewFrame>

	);
}

const styles = StyleSheet.create({

});