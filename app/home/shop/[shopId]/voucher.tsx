import { SafeAreaView, ScrollView, Text } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { VoucherItem } from '../components/VoucherItem';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { shopApi } from '@/api';

export default function Voucher() {
  const { shopId } = useLocalSearchParams<{
    shopId: string;
  }>();

  const query = useQuery({
    queryKey: ['shop-vouchers', { id: shopId }],
    queryFn: shopApi.getDiscounts.bind(null, shopId),
    enabled: !!shopId
  });

  console.log(query.data?.data.data)

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <Container x y gap={'$4'}>
          {query.data?.data.data.map((voucher) => (
            <VoucherItem key={voucher._id} voucher={voucher} />
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
