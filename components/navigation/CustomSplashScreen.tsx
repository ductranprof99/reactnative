import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const CustomSplashScreen: React.FC = () => {
	return (
		<ImageBackground
			source={require('../../assets/images/splash-background.png')}
			style={styles.backgroundImage}
		>
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						source={require('../../assets/images/logo.png')}
						style={styles.logo}
					/>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'flex-start', // Align to the start of the container
		alignItems: 'center',
		paddingTop: '30%', // Adjust this value to move the logo higher or lower
	},
	logo: {
		width: 150,
		height: 150,
	},
});

export default CustomSplashScreen;