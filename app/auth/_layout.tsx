export { ErrorBoundary } from 'expo-router';
import { CustomHeader } from '@/components/__custom__/CustomHeader';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        header: CustomHeader
      }}
    >
      <Stack.Screen
        name="CreateAccount"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="ForgetAccount" />
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
