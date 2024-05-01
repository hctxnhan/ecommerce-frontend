import { voucherApi } from '@/api/voucher';
import {
  Button,
  ButtonText,
  CloseIcon,
  HStack,
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
import { Discount, DiscountApplyType, DiscountType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface VoucherItemModalProps {
  voucher: Discount;
  open: boolean;
  onClose: () => void;
}

const applyValueLabel = {
  [DiscountApplyType.ALL]: 'Can be applied to all products',
  [DiscountApplyType.CATEGORIES]: 'Only applied to specific categories',
  [DiscountApplyType.BRANDS]: 'Only applied to specific brands',
  [DiscountApplyType.PRODUCTS]: 'Only applied to specific products'
};

export function VoucherItemModal({
  voucher,
  open,
  onClose
}: VoucherItemModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const changeStatusMutation = useMutation({
    mutationFn: voucherApi.changeStatus,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['shop-vouchers']
      });
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

  const deleteMutation = useMutation({
    mutationFn: voucherApi.delete,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['shop-vouchers']
      });
      toast.show({
        title: 'Voucher deleted',
        type: 'success',
        description: 'Voucher has been deleted successfully'
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

  // if (isLoading) return null;

  function handleStatusChange(status: 'active' | 'inactive') {
    return () =>
      changeStatusMutation.mutate({
        id: voucher.code,
        status
      });
  }

  function handleDelete() {
    deleteMutation.mutate(voucher.code);
  }

  const startDate = new Date(voucher.startDate).toLocaleDateString();
  const endDate = new Date(voucher.endDate).toLocaleDateString();

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent bg="$backgroundLight0">
        <ModalHeader>
          <Heading flex={1}>{voucher.name}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack gap={'$3'}>
            <Text fontStyle="italic">{voucher.description}</Text>

            <HStack gap={'$1'}>
              <Text fontWeight="bold" color="$primary500">
                (-{voucher.value}
                {voucher.type === DiscountType.PERCENTAGE ? '%' : '$'})
              </Text>
              <Text>{applyValueLabel[voucher.applyType]}</Text>
            </HStack>
            {voucher.applyType !== DiscountApplyType.PRODUCTS && (
              <Text>{voucher.applyValue}</Text>
            )}
            <Text size="sm">
              *** Valid since {startDate} until {endDate}
            </Text>
            <Text size="sm">
              *** Each user can use this voucher {voucher.usageLimitPerUser}{' '}
              times until {endDate} or until the voucher is used{' '}
              {voucher.usageLimit} times.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter gap={'$4'}>
          <Button onPress={handleDelete} flex={1} size="sm" action="negative">
            <ButtonText>Delete</ButtonText>
          </Button>
          <Button flex={1} size="sm" action="secondary">
            <ButtonText
              onPress={handleStatusChange(
                voucher.isActive ? 'inactive' : 'active'
              )}
            >
              {voucher.isActive ? 'Deactivate' : 'Activate'}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
