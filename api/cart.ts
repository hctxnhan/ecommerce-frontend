import { APIResponse, ProductInCart } from '@/types';
import { axiosInstance } from './axiosInstance';

interface AddBody {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  ownerId: string;
}

interface GetCartResponse {
  items: ProductInCart[];
  count: number;
  total: number;
}

export const cartApi = {
  add: (body: AddBody) => axiosInstance.post('/carts', body),
  remove: (cartId: string) => axiosInstance.delete(`/carts/items/${cartId}`),
  empty: () => axiosInstance.put('/carts/empty'),
  get: () => axiosInstance.get<APIResponse<GetCartResponse>>('/carts'),
  updateQuantity: ({
    productId,
    quantity
  }: {
    productId: string;
    quantity: number;
  }) => axiosInstance.patch(`/carts/items/${productId}`, { quantity })
};
