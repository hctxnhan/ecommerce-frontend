import { SafeAreaView, ScrollView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { CategoryFilter } from './components/Home/CategoryFilter';
import { ProductList } from './components/Home/ProductList';
import { SearchBar } from './components/Home/SearchBar';
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
