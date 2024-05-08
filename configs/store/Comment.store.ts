import { createSelectors } from '@/utils/createSelectors';
import { create } from 'zustand';

interface CommentStoreState {
  orderItemId: string | null;
}

interface CommentStoreActions {
  setOrderItemId: (orderItemId: CommentStoreState['orderItemId']) => void;
  clearOrderItemId: () => void;
}

const initialState: CommentStoreState = {
  orderItemId: null
};

export const useCommentStore = createSelectors(
  create<CommentStoreActions & CommentStoreState>((set) => ({
    ...initialState,
    setOrderItemId: (orderItemId) => set({ orderItemId }),
    clearOrderItemId: () => set({ orderItemId: null })
  }))
);
