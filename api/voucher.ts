import { z } from 'zod';
import { axiosInstance } from './axiosInstance';
import { DiscountSchema } from '@/utils/createVoucher';

type VoucherBody = z.infer<typeof DiscountSchema>;

export const voucherApi = {
  create: (body: VoucherBody) => axiosInstance.post('/discounts/', body),
  delete: (id: string) => axiosInstance.delete(`/discounts/${id}`),
  changeStatus: ({
    id,
    status
  }: {
    id: string;
    status: 'active' | 'inactive';
  }) => axiosInstance.put(`/discounts/${id}?status=${status}`)
};
