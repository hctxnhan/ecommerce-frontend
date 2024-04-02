import { cartApi } from '@/api';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText,
  HStack,
  Image,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { ProductInCart } from '@/types';
import { getCurrency } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function RemoveFromCartSheet({
  showActionsheet,
  setShowActionsheet,
  item
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
  item: ProductInCart;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: () => cartApi.remove(item.productId),
    onSuccess: () => {
      toast.show({
        title: 'Success',
        description: 'Product removed from cart',
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
    }
  });

  function handleRemove() {
    removeMutation.mutate();
    setShowActionsheet(false);
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
          <Container w="$full" x pBottom>
            <HStack
              p="$2"
              borderWidth={1}
              rounded={'$lg'}
              borderColor="$borderLight200"
              alignItems="center"
              gap={'$3'}
              w={'$full'}
            >
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
                  {item.productName}
                </Text>
                <Text color="$primary500" fontWeight="bold" size="2xl">
                  {getCurrency(item.price)}
                </Text>
              </VStack>
            </HStack>
          </Container>
        </ActionsheetItem>

        <Button onPress={handleRemove} action="negative" rounded={'$none'}>
          <ButtonText textAlign="center">Yes, remove!</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
