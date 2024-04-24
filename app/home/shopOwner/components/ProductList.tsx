import { FlatList, Spinner } from '@/components';
import { Product, ProductDetail } from '@/types';
import { useToken } from '@gluestack-style/react';
import { ProductItemOwner } from './ProductItem';

interface ProductListOwnerProps {
  pages?: Product[];
  onReachEnd: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  onPressItem?: (product: ProductDetail) => void;
}

export function ProductListOwner({
  pages,
  onReachEnd,
  isLoading,
  isFetchingNextPage,
  onPressItem
}: ProductListOwnerProps) {
  const px = useToken('space', '6');
  const py = useToken('space', '4');

  return (
    <FlatList
      contentContainerStyle={{
        gap: 20,
        paddingVertical: py,
        paddingHorizontal: px
      }}
      w={'$full'}
      numColumns={1}
      data={pages}
      renderItem={({ item }) => (
        <ProductItemOwner
          onPress={() => onPressItem?.(item as ProductDetail)}
          product={item as Product}
        />
      )}
      keyExtractor={(item) => (item as Product)._id}
      onEndReached={onReachEnd}
      ListFooterComponent={isLoading || isFetchingNextPage ? <Spinner /> : null}
    />
  );
}
