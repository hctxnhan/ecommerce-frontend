import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Icon,
  Text,
  VStack
} from '@/components';
import { EditIcon, MapPin } from 'lucide-react-native';

export function Address() {
  return (
    <HStack
      gap={'$4'}
      p="$4"
      borderWidth={1}
      rounded={'$lg'}
      borderColor="$borderLight200"
      w={'$full'}
    >
      <Box
        alignSelf="flex-start"
        rounded="$2xl"
        p={'$4'}
        bg="$backgroundLight100"
      >
        <Icon as={MapPin} size={'xl'} />
      </Box>
      <VStack flex={1} gap={'$1'}>
        <Text fontWeight="bold">Hoang Cong Thanh Nhan</Text>
        <Text size="sm" fontWeight="bold">
          +84 123 456 789
        </Text>
        <Text size="sm">
          Hem 14, duong 30, Linh Dong, TP Thu Duc, TP Ho Chi Minh
        </Text>
      </VStack>
      <Button
        position="absolute"
        top={'$2'}
        right={'$3'}
        variant="link"
        size="xs"
      >
        <ButtonIcon as={EditIcon} />
      </Button>
    </HStack>
  );
}
