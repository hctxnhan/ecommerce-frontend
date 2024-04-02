import { Badge, BadgeText, Box, HStack, Image, Pressable, Text } from '@/components';
import { Product } from '@/types';
import { getCurrency } from '@/utils/utils';
import { useToken } from '@gluestack-style/react';
import { router } from 'expo-router';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const greenToken = useToken('colors', 'green500');

  return (
    <Pressable
      onPress={() => {
        router.push(`home/product-detail/${product._id}`);
      }}
      flex={1}
      gap={'$2'}
      position="relative"
    >
      <Box overflow="hidden" rounded={'$xl'}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          w={'$full'}
          height={200}
        />
      </Box>
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
