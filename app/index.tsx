import { View } from '@/components';
import { Redirect } from 'expo-router';
export default function Home() {
  return (
    <View>
      <Redirect href="/home/user/" />
    </View>
  );
}
