import { HStack, Image, Text, VStack } from '@/components';
import { getCurrency } from '@/utils/utils';

export function OrderReviewItem() {
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
          Variegated snake
        </Text>
        <Text textDecorationLine="line-through" color="$text400" size="md">
          {getCurrency(20)}
        </Text>
        <Text size="md" fontWeight="bold">
          {3} x {getCurrency(18)}
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
            {getCurrency(3 * 18)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
