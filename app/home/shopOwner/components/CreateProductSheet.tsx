import { productApi } from '@/api';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  AddIcon,
  Button,
  ButtonText,
  Fab,
  FabIcon,
  FabLabel,
  ScrollView
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { ProductSchema, ProductType } from '@/utils/createProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductForm } from './ProductForm';

export function CreateProductSheet() {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      type: ProductType.ELECTRONICS,
      isPublished: true
    }
  });

  const { handleSubmit, reset, watch } = form;

  const toast = useToast();
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-products']
      });

      toast.show({
        title: 'Product created',
        type: 'success',
        description: 'Your product has been created successfully'
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

  function onSubmit(data: z.infer<typeof ProductSchema>) {
    createProduct.mutate(data);
  }

  function onClose() {
    setShowActionsheet(false);
    reset();
  }

  const isPublished = watch('isPublished');

  return (
    <>
      <Fab
        onPress={() => setShowActionsheet(true)}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>Create product</FabLabel>
      </Fab>
      <Actionsheet snapPoints={[90]} isOpen={showActionsheet} onClose={onClose}>
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
            Create Product
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
            action={isPublished ? 'primary' : 'secondary'}
            rounded={'$none'}
          >
            <ButtonText textAlign="center">
              {isPublished ? 'Publish' : 'Draft'}
            </ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
