import { APIResponse } from './../types/index';
import { ProductInCart } from '@/types';
import { axiosInstance } from './axiosInstance';

interface CheckoutReviewBody {
  discountCodes: string[];
  cart: {
    total: number;
    count: number;
    items: ProductInCart[];
  };
}

interface CheckoutReviewResponse {
  cart: {
    count: number;
    total: number;
    items: (ProductInCart & {
      totalPriceAfterDiscount: number;
    })[];
  };
}

interface PlaceOrderBody {
  discountCodes: string[];
  deliveryAddress?: {
    address: string;
    city: string;
    name: string;
    phone: string;
    isPrimary: boolean;
  };
}

export const orderApi = {
  checkoutReview: (body: CheckoutReviewBody) =>
    axiosInstance.post<APIResponse<CheckoutReviewResponse>>(
      '/orders/review',
      body
    ),
  placeOrder: (body: PlaceOrderBody) =>
    axiosInstance.post('/orders/checkout', body)
};
