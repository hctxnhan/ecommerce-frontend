import { Button, ButtonText, HStack, Switch, Text } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { FormInput } from '@/components/__custom__/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  address: z.string({
    required_error: 'Address is required'
  }),
  city: z.string({
    required_error: 'City is required'
  }),
  name: z.string({
    required_error: 'Name is required'
  }),
  phone: z.string({
    required_error: 'Phone number is required'
  })
  // isPrimary: z.boolean().optional().default(false)
});

export type DeliveryAddressFormValues = z.infer<typeof Schema>;

interface DeliveryAddressFormProps {
  defaultValues?: z.infer<typeof Schema>;
  onSubmit: (data: z.infer<typeof Schema>) => void;
}

export function DeliveryAddressForm({
  onSubmit,
  defaultValues
}: DeliveryAddressFormProps) {
  const {
    control,

    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues,
    resolver: zodResolver(Schema)
  });

  return (
    <Container gap={'$8'} w="$full">
      <FormInput
        control={control}
        name="name"
        placeholder="Full name"
        label="Name"
        errorMessage={errors.name?.message as string}
      />
      <FormInput
        control={control}
        name="phone"
        placeholder="Phone number"
        label="Phone number"
        errorMessage={errors.phone?.message as string}
      />
      <FormInput
        control={control}
        name="address"
        placeholder="Address"
        label="Address"
        errorMessage={errors.address?.message as string}
      />
      <FormInput
        control={control}
        name="city"
        placeholder="City"
        label="City"
        errorMessage={errors.city?.message as string}
      />

      {/* <Controller
        control={control}
        name="isPrimary"
        render={({ field: { value, onChange } }) => (
          <HStack gap={'$4'} alignItems="center" justifyContent="space-between">
            <Text>Set as primary</Text>
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
      /> */}

      <Button disabled={!isDirty} onPress={handleSubmit(onSubmit)}>
        <ButtonText textAlign="center">Update</ButtonText>
      </Button>
    </Container>
  );
}
