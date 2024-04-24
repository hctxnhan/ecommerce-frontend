import { productApi } from '@/api';
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
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/useToast';
import { Product } from '@/types';
import { getCurrency } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Else, If, Then } from 'react-if';

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onPressUpdate: () => void;
}

export function ProductModal({
  product,
  open,
  onClose,
  onPressUpdate
}: ProductModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { profile, isLoading: isLoadingProfile } = useProfile();

  function invalidateQueries() {
    queryClient.invalidateQueries({
      queryKey: ['my-products']
    });

    if (!isLoadingProfile && profile) {
      queryClient.invalidateQueries({
        queryKey: ['shop-latest-products', { shopId: profile._id }]
      });
    }
  }

  const deleteProduct = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      invalidateQueries();

      toast.show({
        title: 'Product deleted',
        type: 'success',
        description: 'Your product has been deleted successfully'
      });

      onClose();
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  const archive = useMutation({
    mutationFn: productApi.archiveProduct,
    onSuccess: () => {
      invalidateQueries();

      toast.show({
        title: 'Product archived',
        type: 'success',
        description: 'Your product has been archived successfully'
      });

      onClose();
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  const publish = useMutation({
    mutationFn: productApi.publishProduct,
    onSuccess: () => {
      invalidateQueries();

      toast.show({
        title: 'Product published',
        type: 'success',
        description: 'Your product has been published successfully'
      });

      onClose();
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  const handleDelete = () => deleteProduct.mutate(product._id);
  const handleArchive = () => archive.mutate(product._id);
  const handlePublish = () => publish.mutate(product._id);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent bg="$backgroundLight0">
        <ModalHeader>
          <Heading>{product.name}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text mb={'$4'} fontStyle="italic">
            {product.description}
          </Text>

          <VStack gap={'$2'}>
            {Object.entries({
              Price: getCurrency(product.price),
              Type: product.type,
              Published: product.isPublished ? 'Yes' : 'No',
              'Average Rating': product.avgRating
            }).map(([key, value]) => (
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">{key}</Text>
                <Text>{value}</Text>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter gap={'$4'}>
          <Button onPress={handleDelete} flex={1} size="sm" action="negative">
            <ButtonText>Delete</ButtonText>
          </Button>
          <If condition={product.isPublished}>
            <Then>
              <Button
                onPress={handleArchive}
                flex={1}
                size="sm"
                action="secondary"
              >
                <ButtonText>Archive</ButtonText>
              </Button>
            </Then>
            <Else>
              <Button
                onPress={handlePublish}
                flex={1}
                size="sm"
                action="secondary"
              >
                <ButtonText>Publish</ButtonText>
              </Button>
            </Else>
          </If>
          <Button onPress={onPressUpdate} action="positive" flex={1} size="sm">
            <ButtonText>Update</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
