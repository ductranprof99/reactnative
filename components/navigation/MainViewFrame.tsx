import React, { ReactNode } from 'react';
import { SafeAreaView, Platform, StatusBar, View, StyleSheet } from 'react-native';
import HeaderSearch from './HeaderSearch';

interface ScreenWithHeaderProps {
	children: ReactNode;
	onSearchChange?: (text: string) => void;
	onCartPress?: () => void;
	onMenuPress?: () => void;
}

export const MainViewFrame: React.FC<ScreenWithHeaderProps> = ({
	children,
	onSearchChange,
	onCartPress,
	onMenuPress
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<HeaderSearch
				onSearchChange={onSearchChange}
				onCartPress={onCartPress}
				onMenuPress={onMenuPress}
			/>
			<View style={styles.content}>
				{children}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	content: {
		flex: 1,
		// Add any additional styling for your content area
	},
});
