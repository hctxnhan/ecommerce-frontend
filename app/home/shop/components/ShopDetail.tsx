import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Icon,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToken } from '@gluestack-style/react';
import { BadgeCheck, MapPin } from 'lucide-react-native';

export function ShopDetail() {
  const greenToken = useToken('colors', 'green500');
  return (
    <Container x y>
      <HStack alignItems="center" gap="$1">
        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
          <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
        </Avatar>
        <VStack gap={'$1'}>
          <Text ml={'$2'} fontWeight="bold">
            Sandeep Srivastava
          </Text>
          <HStack alignItems="center" gap={'$1'}>
            <Text ml={'$2'} size="sm">
              Verified store
            </Text>
            <BadgeCheck size={18} color={greenToken} />
          </HStack>
        </VStack>
      </HStack>

      <HStack mt={'$4'} gap="$1">
        <Icon as={MapPin} size={'lg'} color="$secondary400" />
        <Text size="sm">
          123, 4th Main, 5th Cross, 6th Sector, 7th Street, 8th Avenue, 9th
          City, 10th Country, 11th Pincode
        </Text>
      </HStack>

      <HStack mt={'$4'} gap={'$10'} justifyContent="flex-start">
        <VStack>
          <Text size="sm" color="$text400">
            Product
          </Text>
          <Text size="sm" color="$text600" fontWeight="bold">
            150 items
          </Text>
        </VStack>
        <VStack>
          <Text size="sm" color="$text400">
            Joined
          </Text>
          <Text size="sm" color="$text600" fontWeight="bold">
            May 15, 2021
          </Text>
        </VStack>
      </HStack>
    </Container>
  );
}
