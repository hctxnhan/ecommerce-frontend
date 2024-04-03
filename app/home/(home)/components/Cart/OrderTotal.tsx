import { HStack, Text, VStack } from '@/components';
import { getCurrency } from '@/utils/utils';

interface OrderTotalProps {
  subtotal: number;
  shipping?: number;
  total?: number;
}

function showPrice(price: number) {
  return price > 0 ? getCurrency(price) : 'Free';
}

export function OrderTotal({ subtotal, shipping = 0, total }: OrderTotalProps) {
  const calculatedTotal = total ?? subtotal + shipping;

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
        <Text fontWeight="bold">{showPrice(subtotal)}</Text>
      </HStack>
      <HStack w="$full" justifyContent="space-between">
        <Text fontWeight="bold" textTransform="uppercase" color="$text500">
          Shipping
        </Text>
        <Text fontWeight="bold">{showPrice(shipping)}</Text>
      </HStack>
      <HStack w="$full" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" textTransform="uppercase" color="$text500">
          Total
        </Text>
        <Text fontWeight="bold" color="$primary500" size="3xl">
          {showPrice(calculatedTotal)}
        </Text>
      </HStack>
    </VStack>
  );
}
