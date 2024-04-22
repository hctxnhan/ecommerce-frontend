import { HStack, Image, Text, VStack } from '@/components';
import { ProductInCart } from '@/types';
import { getCurrency } from '@/utils/utils';

type OrderReviewItemProps = {
  item: ProductInCart & {
    totalPriceAfterDiscount: number;
  };
};

export function OrderReviewItem({ item }: OrderReviewItemProps) {
  const hasDiscount = Number.isFinite(item.totalPriceAfterDiscount);
  const price = hasDiscount ? item.totalPriceAfterDiscount : item.price;

  return (
    <HStack gap={'$3'} w={'$full'} position="relative">
      <Image
        rounded={'$lg'}
        source={{ uri: 'https://via.placeholder.com/150' }}
        w={120}
        h={120}
        objectFit="cover"
        alt="Product image"
      />

      <VStack gap={'$1'} flex={1}>
        <Text size="lg" fontWeight="bold">
          {item.productName}
        </Text>
        {hasDiscount && (
          <Text textDecorationLine="line-through" color="$text400" size="md">
            {getCurrency(item.price)}
          </Text>
        )}
        <Text size="md" fontWeight="bold">
          {item.quantity} x{' '}
          {getCurrency(price)}
        </Text>
        <HStack
          alignItems="flex-end"
          gap={'$4'}
          flex={1}
          justifyContent="flex-end"
        >
          <Text
            fontWeight="bold"
            size="xl"
            textAlign="right"
            flex={1}
            color="$primary500"
          >
            {getCurrency(price * item.quantity)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
