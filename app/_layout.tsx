import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomSplashScreen from '../components/navigation/CustomSplashScreen'; // Update this path
import { SnackBarProvider } from '@/components/utils/snack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [user, setUser] = useState<User | null>(null)
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [showCustomSplash, setShowCustomSplash] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (loaded) {
            ExpoSplashScreen.hideAsync();
            const timer = setTimeout(() => {
                setShowCustomSplash(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [loaded, router]);

    if (!loaded || showCustomSplash) {
        return <CustomSplashScreen />;
    }
    // Main view here
    return (
            <SnackBarProvider>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="helper" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </ThemeProvider>
            </SnackBarProvider>
    );
}