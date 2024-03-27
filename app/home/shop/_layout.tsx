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
        name="[shopId]/index"
        options={{
          title: 'Shop details'
        }}
      />
      <Stack.Screen
        name="[shopId]/voucher"
        options={{
          title: 'Shop vouchers'
        }}
      />
    </Stack>
  );
}
