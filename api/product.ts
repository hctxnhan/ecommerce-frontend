import { APIResponse, ProductDetail } from './../types/index';
import { Product } from '@/types';
import { axiosInstance } from './axiosInstance';
import { z } from 'zod';
import { ProductSchema } from '@/utils/createProduct';
import axios from 'axios';

interface GetProductQuery {
  page: number;
  limit: number;
  search: string;
  category: string;
  shopId: string;
}

export const productApi = {
  getProducts: ({
    page = 1,
    limit = 6,
    search = '',
    category = 'all',
    shopId
  }: GetProductQuery) =>
    axiosInstance.get<APIResponse<Product[]>>('/products', {
      params: {
        page,
        limit,
        search,
        type: category,
        shopId
      }
    }),
  getProductById: (id: string) =>
    axiosInstance.get<APIResponse<ProductDetail>>(`/products/${id}`),
  myProducts: ({
    page = 1,
    limit = 6,
    status
  }: {
    page?: number;
    limit?: number;
    status?: 'published' | 'draft';
  }) =>
    axiosInstance.get<APIResponse<Product[]>>(
      `/products/my-products?page=${page}&limit=${limit}&status=${status}`
    ),
  createProduct: (data: z.infer<typeof ProductSchema>) =>
    axiosInstance.post('/products', data)
};
