import { APIResponse, Discount, Owner } from '@/types';
import { axiosInstance } from './axiosInstance';

export const shopApi = {
  getDiscounts: (shopId: string) =>
    axiosInstance.get<APIResponse<Discount[]>>(`/users/${shopId}/discounts`),
  getShop: (shopId: string) =>
    axiosInstance.get<APIResponse<Owner>>(`/users/${shopId}`)
};
