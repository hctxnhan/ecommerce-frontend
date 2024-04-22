import { Divider, SafeAreaView, VStack } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { OrderDetailItem } from '../orders/components/OrderDetailProduct';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api';

export default function ManageOrder() {
  const query = useQuery({
    queryFn: orderApi.getShopOrderItems,
    queryKey: ['shopOrderItems'],
    select: (data) => data.data.data
  });

  return (
    <SafeAreaView flex={1}>
      <Container x y flex={1}>
        <Divider py={'$2'} />
        <VStack gap={'$8'}>
          {query.data?.map((order) => (
            <OrderDetailItem key={order._id} item={order} />
          ))}
        </VStack>
      </Container>
    </SafeAreaView>
  );
}
