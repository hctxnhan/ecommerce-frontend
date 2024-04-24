import {
  ChevronDownIcon,
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
  SelectTrigger
} from '@/components';
import { FormInput } from '@/components/__custom__/FormInput';
import { DiscountApplyType } from '@/types';
import { DiscountSchema } from '@/utils/createVoucher';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { SelectProductInput } from './SelectProductInput';

const formInput = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'What is the name of the voucher?'
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'What is this voucher about?'
  },
  {
    name: 'minOrderValue',
    label: 'Min Order Value',
    placeholder: 'What is the minimum order value to use this voucher?'
  },
  {
    name: 'usageLimit',
    label: 'Usage Limit',
    placeholder: 'How many times can this voucher be used?'
  },
  {
    name: 'usageLimitPerUser',
    label: 'Usage Limit Per User',
    placeholder: 'How many times can a user use this voucher?'
  },
  {
    name: 'code',
    label: 'Code',
    placeholder: 'What is the code of the voucher?'
  }
];

export function VoucherForm() {
  const {
    watch,
    control,
    formState: { errors },
    setValue
  } = useFormContext<z.infer<typeof DiscountSchema>>();

  const applyType = watch('applyType');
  const discountType = watch('type');

  return (
    <>
      <Select
        selectedValue={applyType}
        onValueChange={(value: string) => {
          setValue('applyType', value as DiscountApplyType);
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
            <SelectItem label="All products" value={DiscountApplyType.ALL} />
            <SelectItem
              label="Specific brands"
              value={DiscountApplyType.BRANDS}
            />
            <SelectItem
              label="Specific categories"
              value={DiscountApplyType.CATEGORIES}
            />
            <SelectItem
              label="Specific products"
              value={DiscountApplyType.PRODUCTS}
            />
          </SelectContent>
        </SelectPortal>
      </Select>

      {/* <SelectCategoryInput /> */}
      <SelectProductInput />

      {formInput.map((input) => (
        <FormInput
          key={input.name}
          control={control}
          name={`attributes.${input.name}`}
          label={input.label}
          placeholder={input.placeholder}
          errorMessage={errors[input.name]?.message}
        />
      ))}
    </>
  );
}
