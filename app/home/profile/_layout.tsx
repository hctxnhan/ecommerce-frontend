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
      <Stack.Screen
        name="SellerRegistration"
        options={{
          title: 'Register as a Seller'
        }}
      />
      <Stack.Screen
        name="RequestHistory"
        options={{
          title: 'Request History'
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        options={{
          title: 'Update Profile'
        }}
      />
    </Stack>
  );
}
