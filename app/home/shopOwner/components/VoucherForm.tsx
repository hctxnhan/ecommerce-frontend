import {
  ChevronDownIcon,
  FormControlLabelText,
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
  Switch as SwitchComp,
  VStack
} from '@/components';
import { FormInput } from '@/components/__custom__/FormInput';
import { DiscountApplyType } from '@/types';
import { DiscountSchema } from '@/utils/createVoucher';
import { Controller, useFormContext } from 'react-hook-form';
import { Case, Switch } from 'react-if';
import { z } from 'zod';
import { SelectCategoryInput } from './SelectCategoryInput';
import { SelectProductInput } from './SelectProductInput';
import { DatePicker } from '@/components/__custom__/DatePicker';

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
    label: 'Min order value',
    placeholder: 'What is the minimum order value to use this voucher?'
  },
  {
    name: 'usageLimit',
    label: 'Usage limit',
    placeholder: 'How many times can this voucher be used?'
  },
  {
    name: 'usageLimitPerUser',
    label: 'Usage limit / user',
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
    getValues,
    formState: { errors },
    setValue
  } = useFormContext<z.infer<typeof DiscountSchema>>();

  const applyType = watch('applyType');

  return (
    <>
      <VStack gap="$2">
        <Select
          selectedValue={applyType}
          onValueChange={(value: string) => {
            setValue('applyType', value as DiscountApplyType);
            setValue('applyValue', [])
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
              {/* <SelectItem
                label="Specific brands"
                value={DiscountApplyType.BRANDS}
              /> */}
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

        <Switch>
          <Case condition={applyType === DiscountApplyType.PRODUCTS}>
            <Controller
              control={control}
              name="applyValue"
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectProductInput
                    setSelectedProducts={onChange}
                    selectedProducts={value}
                  />
                );
              }}
            />
          </Case>

          <Case condition={applyType === DiscountApplyType.CATEGORIES}>
            <Controller
              control={control}
              name="applyValue"
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectCategoryInput
                    selectedCategories={value}
                    setSelectedCategories={onChange}
                  />
                );
              }}
            />
          </Case>
        </Switch>
      </VStack>

      {formInput.map((input) => (
        <FormInput
        
          key={input.name}
          control={control}
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          errorMessage={errors[input.name]?.message}
        />
      ))}

        <FormInput
          control={control}
          name="value"
          placeholder="What is the value of the voucher?"
          errorMessage={errors.value?.message}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              width={'$32'}
              selectedValue={value.toString()}
              onValueChange={onChange}
              placeholder="Select apply type"
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Discount type" />
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
                  <SelectItem label="%" value={'percentage'} />
                  <SelectItem label="Fix amount" value={'fixed'} />
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />

      <VStack gap={'$2'}>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => {
            if (value > getValues('endDate')) {
              setValue('endDate', value);
            }

            return (
              <DatePicker
                config={{
                  minimumDate: new Date()
                }}
                date={value}
                setDate={onChange}
                title="Start date"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              config={{
                minimumDate: getValues('startDate')
              }}
              date={value}
              setDate={onChange}
              title="End date"
            />
          )}
        />
      </VStack>

      <Controller
        control={control}
        name="isActive"
        render={({ field: { value, onChange } }) => (
          <HStack gap={'$4'} alignItems="center" justifyContent="space-between">
            <FormControlLabelText>Active</FormControlLabelText>
            <SwitchComp
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
