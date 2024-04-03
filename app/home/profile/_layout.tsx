export { ErrorBoundary } from 'expo-router';
import { CustomHeader } from '@/components/__custom__/CustomHeader';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: CustomHeader
      }}
    >
      <Stack.Screen
        name="address"
        options={{
          title: 'Primary Delivery Address'
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile Details'
        }}
      />
    </Stack>
  );
}
