import { Stack } from 'expo-router';

export default function HelperLayout() {
    return <Stack>
        <Stack.Screen name="registerscreen" />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        {/* <Stack.Screen name="+not-found" /> */}
    </Stack>;
}