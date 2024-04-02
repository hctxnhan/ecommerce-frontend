import { createSelectors } from '@/utils/createSelectors';
import { create } from 'zustand';

interface CartStoreState {
  deliveryAddress: {
    address: string;
    city: string;
    name: string;
    phone: string;
    isPrimary: boolean;
  } | null;
  voucher: string | null;
}

interface CartStoreActions {
  setDeliveryAddress: (address: CartStoreState['deliveryAddress']) => void;
  setVoucher: (voucher: CartStoreState['voucher']) => void;
}

const initialState: CartStoreState = {
  deliveryAddress: null,
  voucher: null
};

export const useCartStore = createSelectors(
  create<CartStoreActions & CartStoreState>((set) => ({
    ...initialState,
    setDeliveryAddress: (address) => set({ deliveryAddress: address }),
    setVoucher: (voucher) => set({ voucher })
  }))
);
