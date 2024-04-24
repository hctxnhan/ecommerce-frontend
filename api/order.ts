import { ProductInCart } from '@/types';
import {
  APIResponse,
  Order,
  OrderItemStatus,
  OrderStatus,
  ProductDetail,
  ProductInOrder
} from './../types/index';
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

type GetAllOrdersResponse = {
  _id: string;
  orders: Order[];
}[];

type OrderResponse = Order & {
  items: ProductInOrder[];
};

interface GetOrderQuery {
  status: OrderItemStatus;
  page: number;
  limit: number;
}

export const orderApi = {
  checkoutReview: (body: CheckoutReviewBody) =>
    axiosInstance.post<APIResponse<CheckoutReviewResponse>>(
      '/orders/review',
      body
    ),
  placeOrder: (body: PlaceOrderBody) =>
    axiosInstance.post('/orders/checkout', body),
  getAll: (status: OrderStatus) =>
    axiosInstance.get<APIResponse<GetAllOrdersResponse>>(
      `/orders/my-orders?status=${status}`
    ),
  getById: (orderId: string) =>
    axiosInstance.get<APIResponse<OrderResponse>>(`/orders/${orderId}`),
  cancelOrder: (orderId: string) => axiosInstance.delete(`/orders/${orderId}`),
  changeOrderItemStatus: ({
    itemId,
    status
  }: {
    itemId: string;
    status: OrderItemStatus;
  }) => axiosInstance.put(`/orders/order-items/${itemId}/${status}`),
  getOrderItem: (itemId: string) =>
    axiosInstance.get<APIResponse<ProductInOrder>>(
      `/orders/order-items/${itemId}`
    ),
  getShopOrderItems: ({ status, page, limit }: GetOrderQuery) =>
    axiosInstance.get<APIResponse<ProductDetail[]>>(
      `/orders/shop-order-items`,
      {
        params: {
          status,
          page,
          limit
        }
      }
    )
};
