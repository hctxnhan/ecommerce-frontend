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
import { Order } from '@/types';
import { getCurrency } from '@/utils/utils';
import { router } from 'expo-router';

interface OrderItemProps {
  item: Order;
}

export function OrderItem({ item }: OrderItemProps) {
  return (
    <Pressable
      onPress={() => {
        router.push(`/home/orders/${item._id}`);
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
          <VStack gap={'$1'} flex={1}>
            <Text size="xl" fontWeight="bold">
              {item.shippingInfo.name}
            </Text>
            <Text size="xs" color="$text400">
              Deliver to {item.shippingInfo?.address}
            </Text>
            <Text color="$primary500" fontWeight="bold" size="2xl">
              {getCurrency(item.totalValue)}
            </Text>
            <Badge
              p={'$1'}
              variant="solid"
              alignSelf="flex-start"
              action="success"
            >
              <BadgeText>{item.status}</BadgeText>
            </Badge>
          </VStack>
        </HStack>
      </Container>
    </Pressable>
  );
}
