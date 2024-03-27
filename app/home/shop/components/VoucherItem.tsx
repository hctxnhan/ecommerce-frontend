import { Box, HStack, Icon, Text, VStack } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { Calendar, DollarSign } from 'lucide-react-native';

export function VoucherItem() {
  return (
    <Container
      borderWidth={2}
      borderColor="$text200"
      rounded={'$2xl'}
      overflow="hidden"
    >
      <Container
        x
        y
        borderBottomLeftRadius={'$2xl'}
        borderBottomRightRadius={'$2xl'}
        bg="$primary500"
        gap={'$1'}
      >
        <Text color="$text0" fontWeight="bold" size="xl">
          #SUMMER20
        </Text>
        <Text color="$text0">Save 20% on all summer items</Text>

        <Box
          w={'$full'}
          borderTopWidth={2}
          borderStyle="dashed"
          borderColor="$text0"
        />

        <Text size="sm" color="$primary100">
          This voucher belong to Sandeep Srivastava. It can be used only once.
        </Text>
      </Container>

      <Container justifyContent="space-between" gap={'$2'} x y>
        <HStack gap={'$2'}>
          <Box rounded="$2xl" p={'$2'} bg="$backgroundLight100">
            <Icon as={Calendar} size={'xl'} />
          </Box>
          <VStack>
            <Text size="sm" color="$text400">
              Valid till
            </Text>
            <Text color="$text600" fontWeight="$semibold">
              August 31, 2021
            </Text>
          </VStack>
        </HStack>

        <HStack gap={'$2'}>
          <Box rounded="$2xl" p={'$2'} bg="$backgroundLight100">
            <Icon as={DollarSign} size={'xl'} />
          </Box>
          <VStack>
            <Text size="sm" color="$text400">
              Minimum order
            </Text>
            <Text color="$text600" fontWeight="$semibold">
              $100
            </Text>
          </VStack>
        </HStack>
      </Container>
    </Container>
  );
}
