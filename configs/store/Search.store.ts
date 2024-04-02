import { createSelectors } from '@/utils/createSelectors';
import { create } from 'zustand';

interface SearchStoreState {
  search: string;
  page: number;
  sort:
    | 'newest-asc'
    | 'newest-desc'
    | 'price-asc'
    | 'price-desc'
    | 'rating-asc'
    | 'rating-desc';
  category: 'all' | string;
}

interface SearchStoreActions {
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setSort: (
    sort:
      | 'newest-asc'
      | 'newest-desc'
      | 'price-asc'
      | 'price-desc'
      | 'rating-asc'
      | 'rating-desc'
  ) => void;
  setCategory: (category: 'all' | string) => void;
}

const initialState: SearchStoreState = {
  search: '',
  page: 1,
  sort: 'newest-desc',
  category: 'all'
};

export const useSearchStore = createSelectors(
  create<SearchStoreActions & SearchStoreState>((set) => ({
    ...initialState,
    setSearch: (search) => set({ search }),
    setPage: (page) => set({ page }),
    setSort: (sort) => set({ sort }),
    setCategory: (category) => set({ category })
  }))
);
