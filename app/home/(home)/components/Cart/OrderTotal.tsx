import { HStack, Text, VStack } from '@/components';
import { getCurrency } from '@/utils/utils';

export function OrderTotal() {
  return (
    <VStack
      gap={'$6'}
      borderWidth={1}
      rounded={'$lg'}
      borderColor="$borderLight200"
      w="$full"
      p={'$3'}
    >
      <HStack w="$full" justifyContent="space-between">
        <Text fontWeight="bold" textTransform="uppercase" color="$text500">
          Subtotal
        </Text>
        <Text fontWeight="bold">{getCurrency(100)}</Text>
      </HStack>
      <HStack w="$full" justifyContent="space-between">
        <Text fontWeight="bold" textTransform="uppercase" color="$text500">
          Shipping
        </Text>
        <Text fontWeight="bold">{getCurrency(10)}</Text>
      </HStack>
      <HStack w="$full" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" textTransform="uppercase" color="$text500">
          Total
        </Text>
        <Text fontWeight="bold" color="$primary500" size="3xl">
          {getCurrency(110)}
        </Text>
      </HStack>
    </VStack>
  );
}
