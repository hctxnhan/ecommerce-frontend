import { Badge, BadgeText, HStack, Image, Text, VStack } from '@/components';
import { ProductInOrder } from '@/types';
import { getCurrency } from '@/utils/utils';

type OrderReviewItemProps = {
  item: ProductInOrder;
};

export function OrderDetailItem({ item }: OrderReviewItemProps) {
  const hasDiscount = Number.isFinite(item.totalPriceAfterDiscount);

  const price = hasDiscount
    ? (item.totalPriceAfterDiscount as number)
    : item.price;

  return (
    <VStack>
      <HStack mb={'$3'} gap={'$3'} w={'$full'} position="relative">
        <Image
          rounded={'$lg'}
          source={{ uri: 'https://via.placeholder.com/150' }}
          w={120}
          h={'$full'}
          objectFit="cover"
          alt="Product image"
        />

        <VStack gap={'$2'} flex={1}>
          <Badge
            p={'$1'}
            variant="solid"
            alignSelf="flex-start"
            action="success"
          >
            <BadgeText>{item.status}</BadgeText>
          </Badge>

          <Text size="lg" fontWeight="bold">
            {item.name}
          </Text>
          {item.attributes && (
            <Text
              numberOfLines={2}
              size="md"
              fontWeight="$normal"
              color="$text400"
              fontStyle="italic"
            >
              {Object.values(item.attributes).join(', ')}
            </Text>
          )}
          {hasDiscount && (
            <Text textDecorationLine="line-through" color="$text400" size="md">
              {getCurrency(item.price)}
            </Text>
          )}
          <Text size="md" fontWeight="bold">
            {item.quantity} x {getCurrency(price)}
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
      {item.order?.shippingInfo && (
        <VStack p={'$2'} borderWidth={'$1'} borderColor='$borderLight200' gap={'$2'} alignItems='flex-end' rounded={'$xl'}>
          <Text size="xs" fontWeight="bold">
            {item.order.shippingInfo.name}
          </Text>
          <Text size="xs" fontWeight="bold">
            {item.order.shippingInfo.phone}
          </Text>
          <Text size="xs" color="$text400">
            Deliver to {item.order.shippingInfo.address}
          </Text>
        </VStack>
      )}
    </VStack>
  );
}
