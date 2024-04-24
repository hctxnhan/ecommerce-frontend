import {
  ChevronDownIcon,
  HStack,
  Icon,
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
import { FormInput } from '@/components/__custom__/FormInput';
import { ProductSchema } from '@/utils/createProduct';
import { Controller, useFormContext } from 'react-hook-form';
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

export function ProductForm() {
  const {
    watch,
    control,
    formState: { errors },
    setValue
  } = useFormContext<z.infer<typeof ProductSchema>>();

  const productType = watch('type');

  return (
    <>
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
          <HStack gap={'$4'} alignItems="center" justifyContent="space-between">
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
    </>
  );
}
