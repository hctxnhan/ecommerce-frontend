import { HStack, Icon, Text, VStack } from '@/components';
import { Order } from '@/types';
import { CalendarDays } from 'lucide-react-native';
import { OrderItem } from './OrderItem';

interface OrderListProps {
  orders: Order[];
  date: string;
}

export function OrderList({ orders, date }: OrderListProps) {
  return (
    <VStack gap={'$4'}>
      <HStack alignItems="center" justifyContent="flex-start">
        <Icon size={'lg'} as={CalendarDays} color="$secondary300" />
        <Text
          fontSize="$md"
          fontWeight="bold"
          color="$secondary300"
          ml="$2"
          mt="$1"
        >
          {date}
        </Text>
      </HStack>

      {orders.map((order) => (
        <OrderItem key={order._id} item={order} />
      ))}
    </VStack>
  );
}
