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
        name="index"
        options={{
          title: 'My Orders'
        }}
      />
      <Stack.Screen
        name="[orderId]"
        options={{
          title: 'Tracking'
        }}
      />
    </Stack>
  );
}
