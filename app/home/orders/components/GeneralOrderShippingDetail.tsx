import { Badge, BadgeText, Box, HStack, Icon, Text, VStack } from '@/components';
import { TruckIcon } from 'lucide-react-native';

interface GeneralOrderShippingDetailProps {
  orderNumber: string;
  orderStatus: string;
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: {
    name: string;
    address: string;
    phone: string;
  };
}

export function GeneralOrderShippingDetail({
  orderNumber,
  orderStatus,
  orderDate,
  estimatedDelivery,
  deliveryAddress
}: GeneralOrderShippingDetailProps) {
  return (
    <VStack
      gap={'$4'}
      p="$5"
      borderWidth={1}
      rounded={'$lg'}
      borderColor="$borderLight200"
      w={'$full'}
    >
      <HStack alignItems="center" gap={'$3'}>
        <Box rounded="$2xl" p={'$4'} bg="$backgroundLight100">
          <Icon as={TruckIcon} size={'xl'} />
        </Box>
        <VStack flex={1} gap={'$1'}>
          <Text size="md">{orderNumber}</Text>

          <Badge
            p={'$1'}
            variant="solid"
            alignSelf="flex-start"
            action="info"
          >
            <BadgeText>{orderStatus}</BadgeText>
          </Badge>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between">
        <VStack flex={1}>
          <Text size="sm" color="$secondary400">
            Order date
          </Text>
          <Text size="sm" fontWeight="bold">
            {orderDate}
          </Text>
        </VStack>
        <VStack>
          <Text size="sm" color="$secondary400">
            Estimated delivery
          </Text>
          <Text size="sm" fontWeight="bold">
            {estimatedDelivery}
          </Text>
        </VStack>
      </HStack>

      <VStack>
        <Text size="sm" color="$secondary400">
          Delivery address
        </Text>
        <Text size="sm" fontWeight="bold">
          {deliveryAddress.name}
        </Text>
        <Text size="sm" fontWeight="bold">
          {deliveryAddress.address}
        </Text>
        <Text size="sm" fontWeight="bold">
          {deliveryAddress.phone}
        </Text>
      </VStack>
    </VStack>
  );
}
