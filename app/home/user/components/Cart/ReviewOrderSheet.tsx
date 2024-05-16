import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText,
  ScrollView,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { OrderReviewItem } from './OrderReviewItem';
import { OrderTotal } from './OrderTotal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi, orderApi } from '@/api';
import { useCartStore } from '@/configs/store/Cart.store';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';

export function ReviewOrderSheet({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    select: (data) => data.data.data
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const voucher = useCartStore.use.voucher();
  const address = useCartStore.use.deliveryAddress();

  const reviewOrderQuery = useQuery({
    queryKey: ['reviewOrder'],
    queryFn: () =>
      orderApi.checkoutReview({
        cart: cartQuery.data!,
        discountCodes: voucher ? [voucher] : []
      }),
    enabled: showActionsheet && cartQuery.isSuccess && !!cartQuery.data,
    select: (data) => data.data.data.cart
  });

  useEffect(() => {
    if (reviewOrderQuery.isError) {
      toast.show({
        title: 'Error getting todos',
        description: reviewOrderQuery.error.message,
        type: 'error',
      });

      setShowActionsheet(false);
    }
  }, [reviewOrderQuery.isError]);

  const placeOrderMutation = useMutation({
    mutationFn: orderApi.placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });

      toast.show({
        title: 'Success',
        description: 'Order placed',
        type: 'success'
      });
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        description: error.message,
        type: 'error'
      });
    },
    onSettled: () => {
      setShowActionsheet(false);

      queryClient.invalidateQueries({
        queryKey: ['reviewOrder']
      });
    }
  });

  function handlePlaceOrder() {
    placeOrderMutation.mutate({
      discountCodes: voucher ? [voucher] : [],
      deliveryAddress: address
    });
  }

  return (
    <Actionsheet snapPoints={[80]} isOpen={showActionsheet}>
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
        <ActionsheetSectionHeaderText>
          Review Order
        </ActionsheetSectionHeaderText>

        <ScrollView flex={1} w={'$full'}>
          <Container x flex={1}>
            <VStack pb={'$4'} gap={'$6'}>
              {reviewOrderQuery.data?.items?.map((item) => (
                <OrderReviewItem key={item.productId} item={item} />
              ))}
            </VStack>
          </Container>
        </ScrollView>

        <Container w={'$full'} x pBottom>
          <ActionsheetItem w="$full">
            <OrderTotal
              shipping={0}
              total={reviewOrderQuery.data?.total || 0}
              subtotal={reviewOrderQuery.data?.total || 0}
            />
          </ActionsheetItem>
        </Container>

        <Button w='$full' onPress={handlePlaceOrder} rounded={'$none'}>
          <ButtonText textAlign="center">Place order</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
