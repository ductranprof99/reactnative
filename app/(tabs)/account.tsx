import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { LoginScreen } from '@/app/layout/loginscreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
import { UserProfileScreen } from '@/app/layout/userdetailscreen';
import { getUserInfo, updateUserInfo, UserInfo } from '@/services/auth';
export default function AccountScreen() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<UserInfo | null>(null)
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
        const email = user?.email
        if (email !== undefined && email !== null) {
            const fetchData = async () => {
                let request = await getUserInfo(email)
                setProfile({...request})
            }
            fetchData()
                // make sure to catch any error
                .catch(console.error);;
        }
    }, [user]);

    function handleLogin() {
    }

    function handleUpdateAccount(updateInfo: UserInfo) {
        updateUserInfo(updateInfo);
    }

    return (
        <>
            {user == null ? (
                <LoginScreen onClose={handleLogin} isModal={false} />
            ) : (
                <SafeAreaView style={styles.container}>
                    {(profile !== null) &&
                        <UserProfileScreen
                            profile={profile}
                            updateProfile={handleUpdateAccount}
                        />
                    }
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
