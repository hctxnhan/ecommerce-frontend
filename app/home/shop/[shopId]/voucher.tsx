import { SafeAreaView, ScrollView, Text } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { VoucherItem } from '../components/VoucherItem';

export default function voucher() {
  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <Container x y gap={'$4'}>
          <VoucherItem />
          <VoucherItem />
          <VoucherItem />
          <VoucherItem />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
