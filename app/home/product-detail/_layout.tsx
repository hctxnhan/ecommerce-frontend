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
        name="[productId]"
        options={{
          title: 'Product details'
        }}
      />
    </Stack>
  );
}
