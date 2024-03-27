import { SafeAreaView, ScrollView, VStack } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { GeneralOrderShippingDetail } from './components/GeneralOrderShippingDetail';
import { OrderStatus } from './components/OrderStatus';
import { OrderReviewItem } from '../(home)/components/Cart/OrderReviewItem';
import { OrderTotal } from '../(home)/components/Cart/OrderTotal';

export default function OrderId() {
  return (
    <SafeAreaView flex={1}>
      <ScrollView flex={1}>
        <Container x pTop>
          <GeneralOrderShippingDetail />

          <Container y>
            <OrderStatus />
          </Container>

          <Container y>
            <OrderTotal />
            <VStack mt={'$6'} pb={'$4'} gap={'$6'}>
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
            </VStack>
          </Container>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
