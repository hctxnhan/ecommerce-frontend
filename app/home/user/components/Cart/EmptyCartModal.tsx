import { cartApi } from '@/api';
import {
  Box,
  Button,
  ButtonText,
  Center,
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

export function EmptyCartModal() {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();

  const emptyMutation = useMutation({
    mutationFn: cartApi.empty,
    onSuccess: () => {
      toast.show({
        title: 'Success',
        description: 'Cart emptied',
        type: 'success'
      });

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
    },
    onSettled: () => {
      setShowModal(false);
    }
  });

  function handleEmpty() {
    emptyMutation.mutate();
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleOpen() {
    setShowModal(true);
  }

  return (
    <Box>
      <Button
        size="md"
        variant="outline"
        action="secondary"
        onPress={handleOpen}
      >
        <ButtonText textAlign="center">Empty cart</ButtonText>
      </Button>
      <Modal isOpen={showModal} onClose={handleClose}>
        <ModalBackdrop bg="rgba(0, 0, 0, 0.7)" />
        <ModalContent bg="$backgroundLight0">
          <ModalHeader>
            <Heading size="lg">Empty cart</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              You're going to empty your cart. Are you sure you want to do this?
              You can always add items back later, but be careful, this will
              take time to add them back.
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
            <Button flex={1} size="sm" action="negative" onPress={handleEmpty}>
              <ButtonText>Empty</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
