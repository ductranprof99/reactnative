import { StyleSheet, View, ScrollView  } from 'react-native';
import { useAuth } from '@/context/auth';
import { LoginScreen } from '../helper/loginscreen';

export default function AccountScreen() {
    const { user } = useAuth();

    function handleLogin() {

    }

    return (
        <>
            {user == null ? (
                <LoginScreen onClose={handleLogin} isModal={false} />
            ) : (
                <View>
                    <ScrollView></ScrollView>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({

});
