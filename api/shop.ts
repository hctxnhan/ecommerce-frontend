import {
  APIResponse,
  Discount,
  Owner,
  ShopRequest,
  ShopRequestStatus
} from '@/types';
import { axiosInstance } from './axiosInstance';

interface ShopRegistrationBody {
  shopName: string;
  shopDescription: string;
  shopAddress: string;
}

interface ShopRequestConfirmationParams {
  requestId: string;
  status: 'approved' | 'rejected';
}

export const shopApi = {
  getDiscounts: (shopId: string) =>
    axiosInstance.get<APIResponse<Discount[]>>(`/users/${shopId}/discounts`),
  getShop: (shopId: string) =>
    axiosInstance.get<APIResponse<Owner>>(`/users/${shopId}`),
  registerShop: (data: ShopRegistrationBody) =>
    axiosInstance.post('/users/shopRegistration', data),
  getMyShopRegistrationRequest: () =>
    axiosInstance.get<APIResponse<ShopRequest[]>>('/users/my/shopRequests'),
  getShopRegistrationRequests: ({ status }: { status: ShopRequestStatus }) =>
    axiosInstance.get<APIResponse<ShopRequest[]>>(
      `/users/admin/shopRequests?status=${status}`
    ),
  confirmShopRequest: ({ requestId, status }: ShopRequestConfirmationParams) =>
    axiosInstance.post(`/users/admin/shopRequests/${requestId}/${status}`)
};
