import { Box, HStack, Icon, Text, VStack } from '@/components';
import { TruckIcon } from 'lucide-react-native';

export function GeneralOrderShippingDetail() {
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
        <VStack gap={'$1'}>
          <Text size="lg" fontWeight="bold">
            #123456
          </Text>

          <Text color="$primary500">In progress</Text>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between">
        <VStack>
          <Text size="sm" color="$secondary400">
            Order date
          </Text>
          <Text size="sm" fontWeight="bold">
            May 12, 2021
          </Text>
        </VStack>
        <VStack>
          <Text size="sm" color="$secondary400">
            Estimated delivery
          </Text>
          <Text size="sm" fontWeight="bold">
            May 15, 2021
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
