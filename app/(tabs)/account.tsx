import { Platform, SafeAreaView, StatusBar, StyleSheet  } from 'react-native';
import { LoginScreen } from '../helper/loginscreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
import UserProfileScreen from '../helper/userdetailscreen';

export default function AccountScreen() {
    const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [user]);

    function handleLogin() {

    }

    return (
        <>
            {user == null ? (
                <LoginScreen onClose={handleLogin} isModal={false} />
            ) : (
                <SafeAreaView style={styles.container}>
                    <UserProfileScreen/>

                </SafeAreaView>
            )}
        </>
    );
}

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
