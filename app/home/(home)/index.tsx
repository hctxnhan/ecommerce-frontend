import { Box, Divider, SafeAreaView, ScrollView } from '@/components';
import { SearchBar } from './components/Home/SearchBar';
import { SortFilter } from './components/Home/SortFilter';
import { CategoryFilter } from './components/Home/CategoryFilter';
import { Container } from '@/components/__custom__/Container';
import { ProductList } from './components/Home/ProductList';
export default function Home() {
  return (
    <SafeAreaView flex={1}>
      <Container x>
        <SearchBar />
      </Container>
      <ScrollView>
        <Container pTop>
          <CategoryFilter />
        </Container>
        <Container x y>
          <ProductList />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
