import { SafeAreaView, ScrollView } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { VoucherList } from '../components/VoucherList';

export default function Voucher() {
  const { shopId } = useLocalSearchParams<{
    shopId: string;
  }>();

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VoucherList shopId={shopId} />
      </ScrollView>
    </SafeAreaView>
  );
}
