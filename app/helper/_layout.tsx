import { Stack } from 'expo-router';

export default function HelperLayout() {
    return <Stack>
        <Stack.Screen name="registerscreen" />
        <Stack.Screen name="categoryscreen" options={{ headerShown: false }} />
        
        {/* <Stack.Screen name="+not-found" /> */}
    </Stack>;
}