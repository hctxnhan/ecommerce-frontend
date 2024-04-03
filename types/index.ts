export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isPublished: boolean;
  type: string;
  avgRating: number;
  slug: string;
}

export interface Owner {
  name: string;
  status: 'active' | 'inactive';
  verified: boolean;
  _id: string;
}

export interface ProductDetail extends Product {
  owner: Owner;
  attributes: Record<string, string>;
}

export interface ProductInCart {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  ownerId: string;
  total: number;
}

export interface ProductInOrder extends ProductDetail {
  quantity: number;
  totalPriceAfterDiscount?: number;
  status: OrderItemStatus;
  orderId: string;
  productId: string;
}

export enum OrderItemStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPING = 'shipping',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum OrderStatus {
  ALL = 'all',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Order {
  _id: string;
  customerId: string;
  shippingInfo: DeliveryAddress;
  totalValue: number;
  status: OrderStatus;
  createdAt: string;
}

export interface DeliveryAddress {
  address: string;
  name: string;
  phone: string;
  city: string;
}

export interface APIResponse<T> {
  data: T;
  metadata: {
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  };
}
