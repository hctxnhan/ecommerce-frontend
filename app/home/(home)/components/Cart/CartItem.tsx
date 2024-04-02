import { Button, ButtonIcon, HStack, Image, Text, VStack } from '@/components';
import { ProductInCart } from '@/types';
import { getCurrency } from '@/utils/utils';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  Trash2Icon
} from 'lucide-react-native';
import { useState } from 'react';
import { RemoveFromCartSheet } from './RemoveFromCartSheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/api';
import { useToast } from '@/hooks/useToast';

interface CartItemProps {
  item: ProductInCart;
}

export function CartItem({ item }: CartItemProps) {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateQuantityMutation = useMutation({
    mutationFn: cartApi.updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    },
    onError: (error) =>
      toast.show({ title: 'Error', description: error.message, type: 'error' })
  });

  const canPlus = item.quantity < 10;
  const canMinus = item.quantity > 1;

  const handleChangeQuantity = (value: number) => () => {
    if (value === 1 && canPlus) {
      updateQuantityMutation.mutate({
        productId: item.productId,
        quantity: item.quantity + 1
      });
    } else if (value === -1 && canMinus) {
      updateQuantityMutation.mutate({
        productId: item.productId,
        quantity: item.quantity - 1
      });
    }
  };

  return (
    <HStack gap={'$3'} w={'$full'} position="relative">
      <RemoveFromCartSheet
        item={item}
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
          {item.productName}
        </Text>
        <Text fontWeight="bold" size="md">
          {getCurrency(item.price)}
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
              {item.quantity}
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
            {getCurrency(item.price * item.quantity)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
