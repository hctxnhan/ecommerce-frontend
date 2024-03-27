import {
  Badge,
  BadgeText,
  HStack,
  Image,
  Pressable,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { getCurrency } from '@/utils/utils';
import { router } from 'expo-router';

export function OrderItem() {
  return (
    <Pressable
      onPress={() => {
        router.push('/home/orders/1234');
      }}
    >
      <Container w="$full" flex={1}>
        <HStack
          p="$2"
          borderWidth={1}
          rounded={'$lg'}
          borderColor="$borderLight200"
          alignItems="center"
          gap={'$3'}
          w={'$full'}
        >
          <Image
            rounded={'$lg'}
            source={{ uri: 'https://via.placeholder.com/150' }}
            w={120}
            h={120}
            objectFit="cover"
            alt="Product image"
          />

          <VStack gap={'$1'}>
            <Text size="lg" fontWeight="bold">
              Variegated snake
            </Text>
            <Text size="xs" color="$text400">
              +2 more items
            </Text>
            <Text color="$primary500" fontWeight="bold" size="2xl">
              {getCurrency(246)}
            </Text>
            <Badge
              p={'$1'}
              variant="solid"
              alignSelf="flex-start"
              action="success"
            >
              <BadgeText>In transit</BadgeText>
            </Badge>
          </VStack>
        </HStack>
      </Container>
    </Pressable>
  );
}
