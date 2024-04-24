import {
  Badge,
  BadgeText,
  HStack,
  Pressable,
  Text
} from '@/components';
import { Product } from '@/types';
import { getCurrency } from '@/utils/utils';

interface ProductItemOwnerProps {
  product: Product;
  onPress?: () => void;
}

export function ProductItemOwner({ product, onPress }: ProductItemOwnerProps) {
  return (
    <Pressable
      borderWidth={1}
      padding={'$2'}
      rounded={'$xl'}
      borderColor={'$borderLight200'}
      onPress={onPress}
      flex={1}
      gap={'$2'}
      position="relative"
    >
      <Text fontWeight="bold">{product.name}</Text>
      <HStack gap={'$1'} alignItems="center">
        <Badge
          alignSelf="flex-start"
          w={'auto'}
          size="md"
          variant="solid"
          bgColor="$green600"
          borderRadius="$md"
          action="success"
          mb={'$1'}
        >
          <BadgeText color="$text0">{product.type}</BadgeText>
        </Badge>
      </HStack>
      <Text color="$primary500" fontWeight="$bold" size="xl">
        {getCurrency(product.price)}
      </Text>
    </Pressable>
  );
}
