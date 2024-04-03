import { orderApi } from '@/api';
import { SafeAreaView, ScrollView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { useQuery } from '@tanstack/react-query';
import { OrderList } from './components/OrderList';
import { OrderStatus } from '@/types';
import { useState } from 'react';

export default function MyOrders() {
  const [segment, setSegment] = useState(OrderStatus.ALL);

  const query = useQuery({
    queryKey: ['my-orders', segment],
    queryFn: () => orderApi.getAll(segment),
    select: (data) => data.data.data
  });

  return (
    <SafeAreaView flex={1}>
      <Container x pTop>
        <SegmentedButtonGroup
          value={segment}
          onChange={setSegment as (value: string) => void}
        >
          <SegmentedButton value={OrderStatus.ALL}>All</SegmentedButton>
          <SegmentedButton value={OrderStatus.PENDING}>Pending</SegmentedButton>
          <SegmentedButton value={OrderStatus.PROCESSING}>
            In Progress
          </SegmentedButton>
          <SegmentedButton value={OrderStatus.COMPLETED}>
            Completed
          </SegmentedButton>
          <SegmentedButton value={OrderStatus.CANCELLED}>
            Canceled
          </SegmentedButton>
        </SegmentedButtonGroup>
      </Container>

      {query.isSuccess && !!query.data?.length && (
        <ScrollView flex={1}>
          <Container x gap={'$6'} pt={'$4'}>
            {query.data.map((order) => (
              <OrderList
                key={order._id}
                date={order._id}
                orders={order.orders}
              />
            ))}
          </Container>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
