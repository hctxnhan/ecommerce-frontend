import { Divider, SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';

export default function ManageOrder() {
  return (
    <SafeAreaView flex={1}>
      <Container x y flex={1}>
        <Divider py={'$2'} />
      </Container>
    </SafeAreaView>
  );
}
