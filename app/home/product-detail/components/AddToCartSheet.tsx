import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  CircleIcon,
  HStack,
  Image,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  VStack
} from '@/components';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react-native';
import { getCurrency } from '@/utils/utils';
import React, { useState } from 'react';

export function AddToCartSheet({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(1);

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
    <Actionsheet isOpen={showActionsheet}>
      <ActionsheetBackdrop
        onPress={() => {
          setShowActionsheet(false);
        }}
        backgroundColor="$backgroundLight500"
      />
      <ActionsheetContent
        p={0}
        backgroundColor="$backgroundLight100"
        borderRadius="$xl"
      >
        <ActionsheetSectionHeaderText>Add to cart</ActionsheetSectionHeaderText>
        <ActionsheetItem w="$full" flexDirection="column">
          <HStack gap={'$3'} w={'$full'}>
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
              <Text color="$primary500" fontWeight="bold" size="2xl">
                {getCurrency(20)}
              </Text>
              <HStack alignItems="center" gap={'$4'}>
                <Button
                  disabled={!canMinus}
                  onPress={handleChangeQuantity(-1)}
                  size="xl"
                  variant="link"
                  action="secondary"
                >
                  <ButtonIcon
                    color={canMinus ? 'primary500' : 'backgroundLight500'}
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
                    color={canPlus ? 'primary500' : 'backgroundLight500'}
                  />
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ActionsheetItem>
        <Button>
          <ButtonText textAlign="center">Add</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
