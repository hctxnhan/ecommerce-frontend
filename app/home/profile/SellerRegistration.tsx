import { shopApi } from '@/api';
import { Button, ButtonText, SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { FormInput } from '@/components/__custom__/FormInput';
import { useToast } from '@/hooks/useToast';
import { APIError } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  shopName: z.string({
    required_error: 'Shop name is required'
  }),
  shopAddress: z.string({
    required_error: 'Address is required'
  }),
  shopDescription: z.string({
    required_error: 'Shop description is required'
  })
});

export default function SellerRegistration() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema)
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: shopApi.registerShop,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-shop-request-history']
      });

      toast.show({
        title: 'Shop registration request sent successfully',
        type: 'success',
        description: 'Your request has been sent, please wait for approval.'
      });

      reset();
    },
    onError: (error: APIError) => {
      toast.show({
        title: 'Request already exists',
        type: 'error',
        description: error.response?.data.message
      });
    }
  });

  function onSubmit(data: z.infer<typeof Schema>) {
    mutation.mutate(data);
  }

  return (
    <SafeAreaView flex={1}>
      <Container flex={1} x y gap={'$8'} w="$full">
        <FormInput
          control={control}
          name="shopName"
          placeholder="Enter the name of your shop"
          label="Shop name"
          errorMessage={errors.shopName?.message as string}
        />
        <FormInput
          control={control}
          name="shopDescription"
          placeholder="What do you sell?"
          label="Description"
          errorMessage={errors.shopDescription?.message as string}
        />
        <FormInput
          control={control}
          name="shopAddress"
          placeholder="Where is your shop located?"
          label="Address"
          errorMessage={errors.shopAddress?.message as string}
        />
      </Container>
      <Button
        rounded={'$none'}
        variant="link"
        onPress={() => {
          router.push('/home/profile/RequestHistory');
        }}
      >
        <ButtonText textAlign="center">My request history</ButtonText>
      </Button>
      <Button
        rounded={'$none'}
        w="$full"
        disabled={!isDirty}
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText textAlign="center">Request</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
