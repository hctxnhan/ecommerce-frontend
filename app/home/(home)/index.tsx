import { SafeAreaView, ScrollView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useSearchStore } from '@/configs/store/Search.store';
import { CategoryFilter } from './components/Home/CategoryFilter';
import { ProductList } from './components/Home/ProductList';
import { SearchBar } from './components/Home/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '@/api/product';

export default function Home() {
  const search = useSearchStore.use.search();
  const sort = useSearchStore.use.sort();
  const category = useSearchStore.use.category();

  const query = useInfiniteQuery({
    queryKey: ['products', { search, sort, category }],
    queryFn: ({ pageParam }) =>
      productApi.getProducts({
        page: pageParam,
        limit: 6,
        search,
        category
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
      <Container x>
        <SearchBar />
      </Container>
      <Container pTop>
        <CategoryFilter />
      </Container>
      <Container flex={1}>
        <ProductList
          pages={products}
          isFetchingNextPage={query.isFetchingNextPage}
          isLoading={query.isLoading}
          onReachEnd={() => {
            query.fetchNextPage();
          }}
        />
      </Container>
    </SafeAreaView>
  );
}
