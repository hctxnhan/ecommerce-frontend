import { APIResponse, ProductDetail } from './../types/index';
import { Product } from '@/types';
import { axiosInstance } from './axiosInstance';

interface GetProductQuery {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export const productApi = {
  getProducts: ({
    page = 1,
    limit = 6,
    search = '',
    category = 'all'
  }: GetProductQuery) =>
    axiosInstance.get<APIResponse<Product[]>>('/products', {
      params: {
        page,
        limit,
        search,
        type: category
      }
    }),
  getProductById: (id: string) =>
    axiosInstance.get<APIResponse<ProductDetail>>(`/products/${id}`)
};
