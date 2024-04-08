import { orderApi } from '@/api';
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
  Text
} from '@/components';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function CancelOrderModal({ orderId }: { orderId: string }) {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const cancelMutation = useMutation({
    mutationFn: orderApi.cancelOrder,
    onSuccess: () => {
      toast.show({
        title: 'Success',
        description: 'Order canceled',
        type: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['order', orderId]
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
      setShowModal(false);
    }
  });

  const handleClose = setShowModal.bind(null, false);
  const handleOpen = setShowModal.bind(null, true);

  function handleCancel() {
    cancelMutation.mutate(orderId);
  }

  return (
    <>
      <Button
        onPress={handleOpen}
        action="negative"
        w={'$full'}
        rounded="$none"
      >
        <ButtonText textAlign="center">Cancel</ButtonText>
      </Button>
      <Modal isOpen={showModal} onClose={handleClose}>
        <ModalBackdrop bg="rgba(0, 0, 0, 0.7)" />
        <ModalContent bg="$backgroundLight0">
          <ModalHeader>
            <Heading size="lg">Cancel order</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              You're going to cancel your order. Only items that still in
              'Pending' state can be canceled. Another items that already in
              'Shipping' state can't be canceled. Are you sure you want to do
              this?
            </Text>
          </ModalBody>
          <ModalFooter gap={'$4'}>
            <Button
              flex={1}
              variant="outline"
              size="sm"
              action="secondary"
              onPress={handleClose}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button flex={1} size="sm" action="negative" onPress={handleCancel}>
              <ButtonText>Proceed</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
