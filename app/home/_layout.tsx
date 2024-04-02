export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(home)'
};
import { PrivateRoute } from '@/components/__custom__/Auth';
import { Stack } from 'expo-router';
export default function AppLayout() {
  return (
    <PrivateRoute>
      <Stack>
        <Stack.Screen
          name="(home)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="product-detail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="orders"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="shop"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </PrivateRoute>
  );
}
