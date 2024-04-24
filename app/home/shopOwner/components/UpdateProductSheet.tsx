import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText,
  ScrollView
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { ProductDetail } from '@/types';
import { ProductSchema } from '@/utils/createProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductForm } from './ProductForm';
import { productApi } from '@/api';

interface UpdateProductSheetProps {
  product: ProductDetail;
  isShow: boolean;
  close: () => void;
}

export function UpdateProductSheet({
  product,
  isShow,
  close
}: UpdateProductSheetProps) {
  const { _id, slug, avgRating, owner, ...rest } = product;
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      ...rest
    }
  });

  const { handleSubmit, reset, watch } = form;

  const update = useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-products']
      });

      toast.show({
        title: 'Product updated',
        type: 'success',
        description: 'Your product has been updated successfully'
      });

      onClose();
      reset();
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  function onSubmit(data: z.infer<typeof ProductSchema>) {
    update.mutate({
      id: product._id,
      data
    });
  }

  function onClose() {
    close();
    reset();
  }

  console.log(form.formState.errors);

  return (
    <Actionsheet snapPoints={[90]} isOpen={isShow} onClose={onClose}>
      <ActionsheetBackdrop
        onPress={onClose}
        backgroundColor="$backgroundLight500"
      />
      <ActionsheetContent
        p={0}
        backgroundColor="$backgroundLight100"
        borderRadius="$xl"
      >
        <ActionsheetSectionHeaderText>
          Update Product
        </ActionsheetSectionHeaderText>

        <ActionsheetItem flex={1} w="$full" flexDirection="column">
          <ScrollView flex={1} w="$full">
            <Container x pBottom flex={1} gap={'$8'}>
              <FormProvider {...form}>
                <ProductForm />
              </FormProvider>
            </Container>
          </ScrollView>
        </ActionsheetItem>

        <Button
          w="$full"
          onPress={handleSubmit(onSubmit)}
          action={'secondary'}
          rounded={'$none'}
        >
          <ButtonText textAlign="center">Update</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
