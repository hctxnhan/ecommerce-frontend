import { Button, ButtonIcon, HStack, Image, Text, VStack } from '@/components';
import { getCurrency } from '@/utils/utils';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  Trash2Icon
} from 'lucide-react-native';
import { useState } from 'react';
import { RemoveFromCartSheet } from './RemoveFromCartSheet';

export function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const [showActionsheet, setShowActionsheet] = useState(false);

  const canPlus = quantity < 10;
  const canMinus = quantity > 1;

  const handleChangeQuantity = (value: number) => () => {
    if (value === 1 && canPlus) {
      setQuantity(quantity + 1);
    } else if (value === -1 && canMinus) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <HStack gap={'$3'} w={'$full'} position="relative">
      <RemoveFromCartSheet
        showActionsheet={showActionsheet}
        setShowActionsheet={setShowActionsheet}
      />
      <Button
        onPress={() => setShowActionsheet(true)}
        size="xs"
        variant="link"
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
      >
        <ButtonIcon color="$error400" as={Trash2Icon} size="xl" />
      </Button>
      <Image
        rounded={'$lg'}
        source={{ uri: 'https://via.placeholder.com/150' }}
        w={120}
        h={120}
        objectFit="cover"
        alt="Product image"
      />

      <VStack gap={'$1'} flex={1}>
        <Text size="lg" fontWeight="bold">
          Variegated snake
        </Text>
        <Text fontWeight="bold" size="md">
          {getCurrency(20)}
        </Text>
        <HStack
          alignItems="center"
          gap={'$4'}
          flex={1}
          justifyContent="space-between"
        >
          <HStack alignItems="center">
            <Button
              disabled={!canMinus}
              onPress={handleChangeQuantity(-1)}
              size="xl"
              variant="link"
              action="secondary"
            >
              <ButtonIcon
                color={canMinus ? 'primary500' : 'backgroundLight100'}
                as={MinusCircleIcon}
                size="xl"
              />
            </Button>
            <Text w="$8" fontWeight="bold" size="xl" textAlign="center">
              {quantity}
            </Text>
            <Button
              disabled={!canPlus}
              onPress={handleChangeQuantity(1)}
              size="xl"
              variant="link"
              action="secondary"
            >
              <ButtonIcon
                as={PlusCircleIcon}
                size="xl"
                color={canPlus ? 'primary500' : 'backgroundLight100'}
              />
            </Button>
          </HStack>

          <Text
            fontWeight="bold"
            size="xl"
            textAlign="right"
            flex={1}
            color="$primary500"
          >
            {getCurrency(20 * quantity)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
