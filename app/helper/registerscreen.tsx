import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/utils/ThemedText';
import { ThemedView } from '@/components/utils/ThemedView';

export default function RegisterScreen() {
  return (
    <>
      <Stack.Screen options={{headerShown: false}}/>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Pac du pac du</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
