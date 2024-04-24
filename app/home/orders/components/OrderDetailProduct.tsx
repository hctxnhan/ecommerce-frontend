import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  HStack,
  Icon,
  Image,
  Text,
  VStack
} from '@/components';
import { ProductInOrder } from '@/types';
import { getCurrency } from '@/utils/utils';
import { CircleEllipsis as MoreOptionIcon } from 'lucide-react-native';

type OrderReviewItemProps = {
  item: ProductInOrder;
  onPressMore?: () => void;
};

export function OrderDetailItem({ item, onPressMore }: OrderReviewItemProps) {
  const hasDiscount = Number.isFinite(item.totalPriceAfterDiscount);

  const price = hasDiscount
    ? (item.totalPriceAfterDiscount as number)
    : item.price;

  return (
    <VStack borderWidth={'$1'} p={'$2'} borderColor='$borderLight200' rounded={'$xl'}>
      <Button
        position="absolute"
        top={'$2'}
        right={'$2'}
        height={24}
        onPress={onPressMore}
        zIndex={100}
        variant="link"
      >
        <ButtonIcon color="$primary500" as={MoreOptionIcon} />
      </Button>
      <HStack gap={'$3'} w={'$full'} position="relative">
        <Image
          rounded={'$lg'}
          source={{ uri: 'https://via.placeholder.com/150' }}
          w={120}
          h={'$full'}
          objectFit="cover"
          alt="Product image"
        />

        <VStack gap={'$2'} flex={1}>
          <Badge
            p={'$1'}
            variant="solid"
            alignSelf="flex-start"
            action="success"
          >
            <BadgeText>{item.status}</BadgeText>
          </Badge>

          <Text size="lg" fontWeight="bold">
            {item.name}
          </Text>
          {item.attributes && (
            <Text
              numberOfLines={2}
              size="md"
              fontWeight="$normal"
              color="$text400"
              fontStyle="italic"
            >
              {Object.values(item.attributes).join(', ')}
            </Text>
          )}
          {hasDiscount && (
            <Text textDecorationLine="line-through" color="$text400" size="md">
              {getCurrency(item.price)}
            </Text>
          )}
          <Text size="md" fontWeight="bold">
            {item.quantity} x {getCurrency(price)}
          </Text>
          <HStack
            alignItems="flex-end"
            gap={'$4'}
            flex={1}
            justifyContent="flex-end"
          >
            <Text
              fontWeight="bold"
              size="xl"
              textAlign="right"
              flex={1}
              color="$primary500"
            >
              {getCurrency(price * item.quantity)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
