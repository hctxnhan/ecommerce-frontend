import { SafeAreaView } from '@/components';
import {
  DeliveryAddressForm,
  DeliveryAddressFormValues
} from './components/DeliveryAddressForm';
import { Container } from '@/components/__custom__/Container';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/api';
import { useToast } from '@/hooks/useToast';
import { router } from 'expo-router';

export default function Address() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
    select: (data) => data.data.data
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  const updateDA = useMutation({
    mutationFn: profileApi.updateDeliveryAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      });

      toast.show({
        title: 'Success',
        description: 'Delivery address updated',
        type: 'success'
      });

      router.replace('/home/Profile');
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        description: error.message,
        type: 'error'
      });
    }
  });

  function handleSubmit(values: DeliveryAddressFormValues) {
    updateDA.mutate(values);
  }

  return (
    <SafeAreaView flex={1}>
      <Container x pTop>
        {!isLoadingProfile && (
          <DeliveryAddressForm
            onSubmit={handleSubmit}
            defaultValues={profile?.address}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}
