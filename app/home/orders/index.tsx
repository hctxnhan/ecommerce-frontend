import { SafeAreaView, ScrollView, Text, VStack } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { OrderList } from './components/OrderList';

export default function MyOrders() {
  return (
    <SafeAreaView flex={1}>
      <Container x pTop>
        <SegmentedButtonGroup initialValue="0">
          <SegmentedButton value="0">Pending</SegmentedButton>
          <SegmentedButton value="1">In Progress</SegmentedButton>
          <SegmentedButton value="2">Successses</SegmentedButton>
          <SegmentedButton value="3">Canceled</SegmentedButton>
        </SegmentedButtonGroup>
      </Container>

      <ScrollView flex={1}>
        <Container x gap={'$6'} pt={'$4'}>
          <OrderList />
          <OrderList />
          <OrderList />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
