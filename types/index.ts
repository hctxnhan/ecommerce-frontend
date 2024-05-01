import { ProductType } from '@/utils/createProduct';
import { AxiosError } from 'axios';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isPublished: boolean;
  type: ProductType;
  avgRating: number;
  slug: string;
}

export enum UserRole {
  ADMIN = 'admin',
  SHOP_OWNER = 'shopOwner',
  USER = 'user'
}

export interface Owner {
  name: string;
  status: 'active' | 'inactive';
  verified: boolean;
  _id: string;
  role: UserRole;
  email: string;
  shop: {
    name: string;
    description: string;
    address: string;
  };
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
  order?: {
    shippingInfo?: DeliveryAddress;
  };
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

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed'
}

export enum DiscountApplyType {
  ALL = 'all',
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
  BRANDS = 'brands'
}

export interface Discount {
  _id: string;
  applyType: DiscountApplyType;
  applyValue: string[];
  code: string;
  description: string;
  endDate: string;
  isActive: boolean;
  minOrderValue: number;
  name: string;
  owner: string;
  startDate: string;
  type: DiscountType;
  usageLimit: number;
  usageLimitPerUser: number;
  usedCount: number;
  value: number;
}

export enum VoucherStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired'
}

export interface Comment {
  _id: string;
  productId: string;
  userId: string;
  content: string;
  parentCommentId: string | null;
  isDeleted: boolean;
  commentLeft: number;
  commentRight: number;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export enum ShopRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface ShopRequest {
  _id: string;
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  status: ShopRequestStatus;
  createdAt: string;
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

export interface APIError extends Omit<AxiosError, 'response'> {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}
