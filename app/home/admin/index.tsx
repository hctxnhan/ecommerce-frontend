import { productApi } from '@/api/product';
import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';

export default function Home() {
  return (
    <SafeAreaView flex={1}>
      <Container x></Container>
      <Container pTop></Container>
      <Container flex={1}></Container>
    </SafeAreaView>
  );
}
