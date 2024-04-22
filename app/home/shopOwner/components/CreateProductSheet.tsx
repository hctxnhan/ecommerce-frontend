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
  ChevronDownIcon,
  Fab,
  FabIcon,
  FabLabel,
  HStack,
  Icon,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Switch,
  Text
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { FormInput } from '@/components/__custom__/FormInput';
import { useToast } from '@/hooks/useToast';
import { ProductSchema } from '@/utils/createProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formInput = {
  furniture: [
    {
      name: 'brand',
      label: 'Brand',
      placeholder: 'Which brand is this product?'
    },
    {
      name: 'size',
      label: 'Size',
      placeholder: 'What size is this product?'
    },
    {
      name: 'color',
      label: 'Color',
      placeholder: 'What color is this product?'
    },
    {
      name: 'material',
      label: 'Material',
      placeholder: 'What material is this product made of?'
    }
  ],
  clothes: [
    {
      name: 'brand',
      label: 'Brand',
      placeholder: 'Which brand is this product?'
    },
    {
      name: 'size',
      label: 'Size',
      placeholder: 'What size is this product?'
    },
    {
      name: 'color',
      label: 'Color',
      placeholder: 'What color is this product?'
    },
    {
      name: 'material',
      label: 'Material',
      placeholder: 'What material is this product made of?'
    }
  ],
  electronics: [
    {
      name: 'manufacturer',
      label: 'Manufacturer',
      placeholder: 'Who made this product?'
    },
    {
      name: 'model',
      label: 'Model',
      placeholder: 'What is the model of this product?'
    },
    {
      name: 'color',
      label: 'Color',
      placeholder: 'What color is this product?'
    },
    {
      name: 'dimensions',
      label: 'Dimensions',
      placeholder: 'What are the dimensions of this product?'
    },
    {
      name: 'weight',
      label: 'Weight',
      placeholder: 'How much does it weigh?'
    }
  ]
};

export function CreateProductSheet() {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      type: 'electronics',
      isPublished: true
    }
  });

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

  const productType = watch('type');
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
                <Select
                  selectedValue={productType}
                  onValueChange={(value) => {
                    setValue('type', value);
                  }}
                  placeholder="Select product type"
                >
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Electronics" value="electronics" />
                      <SelectItem label="Clothes" value="clothes" />
                      <SelectItem label="Furniture" value="furniture" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <FormInput
                  control={control}
                  name="name"
                  label="Name"
                  placeholder="What is the name of the product?"
                  errorMessage={errors?.name?.message}
                />
                <FormInput
                  control={control}
                  name="description"
                  label="Description"
                  multiline
                  placeholder="What is this product about?"
                  errorMessage={errors.description?.message}
                />
                <FormInput
                  control={control}
                  name="price"
                  label="Price"
                  placeholder="How much does it cost?"
                  errorMessage={errors.price?.message}
                />
                <FormInput
                  control={control}
                  name="stock"
                  label="Stock"
                  placeholder="How many items are in stock?"
                  errorMessage={errors.stock?.message}
                />

                {formInput[productType].map((input) => (
                  <FormInput
                    key={input.name}
                    control={control}
                    name={`attributes.${input.name}`}
                    label={input.label}
                    placeholder={input.placeholder}
                    errorMessage={errors?.attributes?.[input.name]?.message}
                  />
                ))}

                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field: { value, onChange } }) => (
                    <HStack
                      gap={'$4'}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text>Publish</Text>
                      <Switch
                        value={value}
                        onValueChange={onChange}
                        trackColor={{
                          true: '$primary500',
                          false: '$borderLight200'
                        }}
                      />
                    </HStack>
                  )}
                />
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
