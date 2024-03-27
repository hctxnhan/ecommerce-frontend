import { HStack, Icon, Text, VStack } from '@/components';
import { CalendarDays } from 'lucide-react-native';
import { OrderItem } from './OrderItem';

export function OrderList() {
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
          May 12, 2021
        </Text>
      </HStack>

      <OrderItem />
      <OrderItem />
    </VStack>
  );
}
