import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Text,
  VStack
} from '@/components';
import { useToken } from '@gluestack-style/react';
import { BadgeCheck } from 'lucide-react-native';

interface ShopBadgeProps {
  shopName: string;
  shopId: string;
  shopVerified: boolean;
}

export function ShopBadge({ shopName, shopId, shopVerified }: ShopBadgeProps) {
  const greenToken = useToken('colors', 'green500');
  return (
    <HStack alignItems="center" gap="$1">
      <Avatar bgColor="$amber600" size="md" borderRadius="$full">
        <AvatarFallbackText>{shopName}</AvatarFallbackText>
      </Avatar>
      <VStack gap={'$1'}>
        <Text ml={'$2'} fontWeight="bold">
          {shopName}{' '}
        </Text>
        <HStack alignItems="center" gap={'$1'}>
          <Text ml={'$2'} size="sm">
            {shopVerified ? 'Verified store' : 'Unverified store'}
          </Text>
          {shopVerified && <BadgeCheck size={18} color={greenToken} />}
        </HStack>
      </VStack>
    </HStack>
  );
}
