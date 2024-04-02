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
