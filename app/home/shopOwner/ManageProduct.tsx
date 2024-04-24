import { productApi } from '@/api';
import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { ProductDetail } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateProductSheet } from './components/CreateProductSheet';
import { ProductListOwner } from './components/ProductList';
import { ProductModal } from './components/ProductModal';
import { UpdateProductSheet } from './components/UpdateProductSheet';

enum ProductStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft'
}

export default function ManageProduct() {
  const [segment, setSegment] = useState(ProductStatus.PUBLISHED);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);

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
      <ProductListOwner
        pages={products}
        onReachEnd={() => {
          query.fetchNextPage();
        }}
        onPressItem={setSelectedProduct}
        isFetchingNextPage={query.isFetchingNextPage}
        isLoading={query.isLoading}
      />

      <CreateProductSheet />

      {selectedProduct && (
        <ProductModal
          onPressUpdate={() => {
            setShowUpdate(true);
          }}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}

      {selectedProduct && (
        <UpdateProductSheet
          product={selectedProduct}
          close={() => setShowUpdate(false)}
          isShow={showUpdate}
        />
      )}
    </SafeAreaView>
  );
}
