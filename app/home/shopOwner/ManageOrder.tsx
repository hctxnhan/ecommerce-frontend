import { orderApi } from '@/api';
import { SafeAreaView, ScrollView, VStack } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { OrderItemStatus } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { OrderDetailItem } from '../orders/components/OrderDetailProduct';
import { OrderItemModal } from './components/OrderItemModal';

export default function ManageOrder() {
  const [status, setStatus] = useState(OrderItemStatus.PENDING);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);

  const query = useInfiniteQuery({
    queryKey: ['shopOrderItems', { status }],
    queryFn: ({ pageParam }) =>
      orderApi.getShopOrderItems({ status, page: pageParam, limit: 5 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.data.metadata.pagination.total >=
        lastPage.data.metadata.pagination.limit
      ) {
        return lastPage.data.metadata.pagination.page + 1;
      }
    }
  });

  const orders = query.data?.pages.flatMap((page) => page.data.data);

  function handlePressMore(orderId: string) {
    setItemId(orderId);
    setShowModal(true);
  }

  return (
    <SafeAreaView flex={1}>
      <Container x pTop>
        <SegmentedButtonGroup
          value={status}
          onChange={setStatus as (value: string) => void}
        >
          <SegmentedButton value={OrderItemStatus.PENDING}>
            Pending
          </SegmentedButton>
          <SegmentedButton value={OrderItemStatus.CONFIRMED}>
            Confirmed
          </SegmentedButton>
          <SegmentedButton value={OrderItemStatus.SHIPPING}>
            Shipping
          </SegmentedButton>
          <SegmentedButton value={OrderItemStatus.COMPLETED}>
            Completed
          </SegmentedButton>
          <SegmentedButton value={OrderItemStatus.CANCELLED}>
            Canceled
          </SegmentedButton>
        </SegmentedButtonGroup>
      </Container>
      <ScrollView>
        <Container x y flex={1}>
          <VStack gap={'$8'}>
            {orders?.map((order) => (
              <OrderDetailItem
                onPressMore={() => handlePressMore(order._id)}
                key={order._id}
                item={order}
              />
            ))}
          </VStack>
        </Container>
      </ScrollView>

      {itemId && (
        <OrderItemModal
          itemId={itemId}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </SafeAreaView>
  );
}
