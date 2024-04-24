import { useLocalSearchParams } from 'expo-router';
import ShopId from '../components/ShopId';

export default function index() {
  const { shopId } = useLocalSearchParams<{
    shopId: string;
  }>();

  return <ShopId shopId={shopId} />;
}
