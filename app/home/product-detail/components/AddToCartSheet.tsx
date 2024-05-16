import { cartApi } from '@/api';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Image,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { Product, ProductDetail } from '@/types';
import { getCurrency } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react-native';
import { useState } from 'react';

export function AddToCartSheet({
  showActionsheet,
  setShowActionsheet,
  product
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
  product: ProductDetail;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const addMutation = useMutation({
    mutationFn: cartApi.add,
    onSuccess: () => {
      toast.show({
        title: 'Success',
        description: 'Product added to cart',
        type: 'success'
      });

      setShowActionsheet(false);

      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        description: error.message,
        type: 'error'
      });
    }
  });

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

  function handleAddToCart() {
    addMutation.mutate({
      productId: product._id,
      quantity,
      price: product.price,
      productName: product.name,
      ownerId: product.owner?._id,
      type: product.type
    });
  }

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
          <Container x pBottom w="$full">
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
                  {product.name}
                </Text>
                <Text color="$primary500" fontWeight="bold" size="2xl">
                  {getCurrency(product.price)}
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
          </Container>
        </ActionsheetItem>
        <Button w={'$full'} onPress={handleAddToCart} rounded="$none">
          <ButtonText textAlign="center">Add</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
