import { profileApi } from '@/api';
import { Button, ButtonText, SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { FormInput } from '@/components/__custom__/FormInput';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }),
  phone: z.string({
    required_error: 'Phone number is required'
  })
});

export type UpdateProfileFormValues = z.infer<typeof Schema>;

export default function UpdateProfile() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(Schema)
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.show({
        type: 'success',
        description: 'Profile updated successfully',
        title: 'Profile updated'
      });
    }
  });
  const { profile, isLoading: isLoadingProfile } = useProfile();

  useEffect(() => {
    if (profile && !isLoadingProfile) {
      reset({
        name: profile.name,
        phone: profile.phone || ''
      });
    }
  }, [profile, isLoadingProfile]);

  const onSubmit = (data: UpdateProfileFormValues) => {
    update.mutate(data);
  };

  return (
    <SafeAreaView flex={1}>
      <>
        <Container flex={1} x y gap={'$8'} w="$full">
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
        </Container>
        <Button
          rounded={'$none'}
          disabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText textAlign="center">Update</ButtonText>
        </Button>
      </>
    </SafeAreaView>
  );
}
