import React, { ReactNode } from 'react';
import { SafeAreaView, Platform, StatusBar, View, StyleSheet } from 'react-native';
import HeaderSearch from './HeaderSearch';

interface ScreenWithHeaderProps {
	children: ReactNode;
	onPush?: Boolean;
	onSearchChange?: (text: string) => void;
	onCartPress?: () => void;
}

export const MainViewFrame: React.FC<ScreenWithHeaderProps> = ({
	children,
	onPush,
	onSearchChange,
	onCartPress,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<HeaderSearch
				onSearchChange={onSearchChange}
				onCartPress={onCartPress}
				onPush={onPush}
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
