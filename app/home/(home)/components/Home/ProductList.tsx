import { FlatList, Spinner } from '@/components';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { useToken } from '@gluestack-style/react';

interface ProductListProps {
  pages?: Product[];
  onReachEnd: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
}

export function ProductList({
  pages,
  onReachEnd,
  isLoading,
  isFetchingNextPage
}: ProductListProps) {
  const px = useToken('space', '6')
  const py = useToken('space', '4')

  return (
    <FlatList
      columnWrapperStyle={{
        gap: 20
      }}
      contentContainerStyle={{
        gap: 20,
        paddingVertical: py,
        paddingHorizontal: px
      }}
      w={'$full'}
      numColumns={2}
      data={pages}
      renderItem={({ item }) => <ProductCard product={item as Product} />}
      keyExtractor={(item) => (item as Product)._id}
      onEndReached={onReachEnd}
      ListFooterComponent={isLoading || isFetchingNextPage ? <Spinner /> : null}
    />
  );
}
