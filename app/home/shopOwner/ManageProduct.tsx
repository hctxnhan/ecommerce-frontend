import { productApi } from '@/api';
import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { ShopRequestStatus } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ProductList } from '../user/components/Home/ProductList';
import { CreateProductSheet } from './components/CreateProductSheet';

enum ProductStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft'
}

export default function ManageProduct() {
  const [segment, setSegment] = useState(ProductStatus.PUBLISHED);

  const query = useInfiniteQuery({
    queryKey: [
      'my-products',
      {
        status: segment
      }
    ],
    queryFn: ({ pageParam }) =>
      productApi.myProducts({
        page: pageParam,
        limit: 6,
        status: segment
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.data.metadata.pagination.total >=
        lastPage.data.metadata.pagination.limit
      ) {
        return lastPage.data.metadata.pagination.page + 1;
      }
    }
  });

  const products = query.data?.pages.flatMap((page) => page.data.data);

  return (
    <SafeAreaView flex={1}>
      <CreateProductSheet />
      <Container x y>
        <SegmentedButtonGroup
          value={segment}
          onChange={setSegment as (value: string) => void}
        >
          <SegmentedButton value={ProductStatus.PUBLISHED}>
            For Sell
          </SegmentedButton>
          <SegmentedButton value={ProductStatus.DRAFT}>Draft</SegmentedButton>
        </SegmentedButtonGroup>
      </Container>
      <ProductList
        pages={products}
        onReachEnd={() => {
          query.fetchNextPage();
        }}
        isFetchingNextPage={query.isFetchingNextPage}
        isLoading={query.isLoading}
      />
    </SafeAreaView>
  );
}