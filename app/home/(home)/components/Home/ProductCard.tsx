import { Box, HStack, Image, Pressable, Text, VStack } from '@/components';
import { getCurrency } from '@/utils/utils';
import { useToken } from '@gluestack-style/react';
import { router } from 'expo-router';
import { BadgeCheck } from 'lucide-react-native';

export function ProductCard() {
  const greenToken = useToken('colors', 'green500');

  return (
    <Pressable
      onPress={() => {
        router.push('home/product-detail/1');
      }}
      gap={'$2'}
      w={'47%'}
      position="relative"
    >
      <Box overflow="hidden" rounded={'$xl'}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          w={'$full'}
          height={200}
        />
      </Box>
      <Text fontWeight="bold">Variegated snake</Text>
      <HStack gap={'$1'} alignItems="center">
        <Text color="$text500" size="sm">
          Succulent
        </Text>
        <BadgeCheck size={18} color={greenToken} />
      </HStack>
      <Text color="$primary500" fontWeight="$bold" size="xl">
        {getCurrency(100)}
      </Text>
      <Box position="absolute"></Box>
    </Pressable>
  );
}
