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
  shopId?: string;
}

interface MyProductQuery {
  page: number;
  limit: number;
  status: 'published' | 'draft';
  search?: string;
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
  myProducts: ({ search = '', page = 1, limit = 6, status }: MyProductQuery) =>
    axiosInstance.get<APIResponse<ProductDetail[]>>(
      `/products/my-products?page=${page}&limit=${limit}&status=${status}&search=${search}`
    ),
  createProduct: (data: z.infer<typeof ProductSchema>) =>
    axiosInstance.post('/products', data),
  updateProduct: ({
    id,
    data
  }: {
    id: string;
    data: z.infer<typeof ProductSchema>;
  }) => axiosInstance.patch(`/products/${id}`, data),
  deleteProduct: (id: string) => axiosInstance.delete(`/products/${id}`),
  archiveProduct: (id: string) =>
    axiosInstance.put(`/products/${id}/unpublish`),
  publishProduct: (id: string) => axiosInstance.put(`/products/${id}/publish`)
};
