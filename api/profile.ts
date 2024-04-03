import { DeliveryAddressFormValues } from '@/app/home/profile/components/DeliveryAddressForm';
import { axiosInstance } from './axiosInstance';
import { APIResponse, DeliveryAddress, Owner } from '@/types';

interface Profile extends Owner {
  address?: DeliveryAddress;
}

export const profileApi = {
  updateDeliveryAddress: (body: DeliveryAddressFormValues) =>
    axiosInstance.put('/orders/delivery-address', body),
  getProfile: () => axiosInstance.get<APIResponse<Profile>>('/auth/profile')
};
