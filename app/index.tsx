import { View } from '@/components';
import { IfRole } from '@/components/__custom__/Auth';
import { UserRole } from '@/types';
import { Redirect } from 'expo-router';
export default function Home() {
  return (
    <View>
      <IfRole is={UserRole.ADMIN}>
        <Redirect href="/home/admin/" />
      </IfRole>
      <IfRole is={UserRole.USER}>
        <Redirect href="/home/" />
      </IfRole>
      <IfRole is={UserRole.SHOP_OWNER}>
        <Redirect href="/home/shopOwner/" />
      </IfRole>
    </View>
  );
}
