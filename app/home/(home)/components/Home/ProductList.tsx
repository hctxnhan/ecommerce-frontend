import { HStack } from '@/components';
import { ProductCard } from './ProductCard';

export function ProductList() {
  return (
    <HStack flexWrap="wrap" rowGap={'$10'} justifyContent="space-between">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </HStack>
  );
}
