import { orderApi } from '@/api';
import {
  SafeAreaView,
  ScrollView,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { OrderItemStatus, OrderStatus as OrderStatusEnum } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { OrderTotal } from '../(home)/components/Cart/OrderTotal';
import { CancelOrderModal } from './components/CancelOrderSheet';
import { GeneralOrderShippingDetail } from './components/GeneralOrderShippingDetail';
import { OrderDetailItem } from './components/OrderDetailProduct';
import { OrderStatus } from './components/OrderStatus';

export default function OrderId() {
  const { orderId } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderApi.getById(orderId as string),
    enabled: !!orderId,
    select: (data) => data.data.data
  });

  const calculatedStatus = data?.items.every(
    (item) => item.status === OrderItemStatus.PENDING
  )
    ? OrderStatusEnum.PENDING
    : data?.items.every((item) => item.status === OrderItemStatus.CANCELLED)
    ? OrderStatusEnum.CANCELLED
    : data?.items.every(
        (item) =>
          item.status === OrderItemStatus.COMPLETED ||
          item.status === OrderItemStatus.CANCELLED
      )
    ? OrderStatusEnum.COMPLETED
    : data?.items.some((item) => item.status === OrderItemStatus.SHIPPING)
    ? OrderStatusEnum.PROCESSING
    : OrderStatusEnum.PENDING;

  return (
    <SafeAreaView flex={1}>
      <ScrollView flex={1}>
        <Container x pTop>
          {!!data && (
            <>
              <GeneralOrderShippingDetail
                orderDate={new Date(data.createdAt).toDateString()}
                orderNumber={data._id}
                orderStatus={calculatedStatus}
                estimatedDelivery="3 days"
                deliveryAddress={data?.shippingInfo}
              />

              <Container y>
                <OrderStatus status={calculatedStatus} />
              </Container>

              <Container y>
                <OrderTotal subtotal={data.totalValue} />
                <VStack mt={'$6'} pb={'$4'} gap={'$6'}>
                  {data.items.map((product) => (
                    <OrderDetailItem key={product._id} item={product} />
                  ))}
                </VStack>
              </Container>
            </>
          )}
        </Container>
      </ScrollView>
      <CancelOrderModal orderId={orderId as string} />
    </SafeAreaView>
  );
}
