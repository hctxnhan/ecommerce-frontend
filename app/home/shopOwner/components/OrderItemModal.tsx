import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack
} from '@/components';
import { useToast } from '@/hooks/useToast';
import { OrderItemStatus } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  OrderStatus,
  orderItemSteps
} from '../../orders/components/OrderStatus';
import { orderApi } from '@/api';

interface OrderItemModalProps {
  itemId: string;
  open: boolean;
  onClose: () => void;
}

const nextStatusLabel: Record<OrderItemStatus, string> = {
  [OrderItemStatus.PENDING]: `Mark as ${OrderItemStatus.CONFIRMED}`,
  [OrderItemStatus.CONFIRMED]: `Mark as ${OrderItemStatus.SHIPPING}`,
  [OrderItemStatus.SHIPPING]: `Mark as ${OrderItemStatus.COMPLETED}`,
  [OrderItemStatus.COMPLETED]: `Completed`,
  [OrderItemStatus.CANCELLED]: `Cancelled`
};

const nextStatus: Partial<Record<OrderItemStatus, OrderItemStatus>> = {
  [OrderItemStatus.PENDING]: OrderItemStatus.CONFIRMED,
  [OrderItemStatus.CONFIRMED]: OrderItemStatus.SHIPPING,
  [OrderItemStatus.SHIPPING]: OrderItemStatus.COMPLETED
};

export function OrderItemModal({ itemId, open, onClose }: OrderItemModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const changeStatusMutation = useMutation({
    mutationFn: orderApi.changeOrderItemStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-item', itemId] });
      queryClient.invalidateQueries({ queryKey: ['shopOrderItems'] });
      onClose();
      toast.show({
        title: 'Order item status updated',
        type: 'success',
        description: 'Order item status has been updated successfully'
      });
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ['order-item', itemId],
    queryFn: () => orderApi.getOrderItem(itemId as string),
    enabled: !!itemId,
    select: (data) => data.data.data
  });

  if (isLoading) return null;

  const buttonDisabled =
    [OrderItemStatus.COMPLETED, OrderItemStatus.CANCELLED].includes(
      data?.status || OrderItemStatus.PENDING
    ) || false;

  function handleChangeStatus() {
    if (!data) return;

    const next = nextStatus[data.status];

    if (!next) return;

    changeStatusMutation.mutate({
      itemId,
      status: next
    });
  }

  function handleCancelOrder() {
    if (!data) return;

    changeStatusMutation.mutate({
      itemId,
      status: OrderItemStatus.CANCELLED
    });
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent bg="$backgroundLight0">
        <ModalHeader>
          <Heading>Order #{itemId}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {data?.order?.shippingInfo && (
            <VStack
              mb={'$4'}
              borderWidth={'$1'}
              borderColor="$borderLight200"
              rounded={'$xl'}
              overflow="hidden"
            >
              <Text
                textTransform="uppercase"
                backgroundColor="$backgroundLight200"
                py="$1"
                px="$2"
                size="sm"
                fontWeight="bold"
              >
                Shipping to
              </Text>
              <VStack gap={'$2'} p={'$2'}>
                <Text size="xs" fontWeight="bold">
                  {data?.order.shippingInfo.name}
                </Text>
                <Text size="xs" fontWeight="bold">
                  {data?.order.shippingInfo.phone}
                </Text>
                <Text size="xs" color="$text400">
                  Deliver to {data?.order.shippingInfo.address}
                </Text>
              </VStack>
            </VStack>
          )}

          <OrderStatus
            steps={orderItemSteps}
            status={data?.status || OrderItemStatus.PENDING}
          />
        </ModalBody>
        <ModalFooter gap={'$4'}>
          {!buttonDisabled && (
            <Button
              onPress={handleCancelOrder}
              flex={1}
              size="sm"
              action="negative"
            >
              <ButtonText>Cancel order</ButtonText>
            </Button>
          )}
          <Button
            flex={1}
            size="sm"
            disabled={buttonDisabled}
            action={buttonDisabled ? 'secondary' : 'positive'}
            onPress={handleChangeStatus}
          >
            <ButtonText>
              {nextStatusLabel[data?.status || OrderItemStatus.PENDING]}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
