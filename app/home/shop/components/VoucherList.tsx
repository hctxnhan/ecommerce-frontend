import { shopApi } from '@/api';
import { Container } from '@/components/__custom__/Container';
import { useQuery } from '@tanstack/react-query';
import { VoucherItem } from '../components/VoucherItem';

interface VoucherListProps {
  shopId: string;
}

export function VoucherList({ shopId }: VoucherListProps) {
  const query = useQuery({
    queryKey: ['shop-vouchers', { id: shopId }],
    queryFn: shopApi.getDiscounts.bind(null, shopId),
    enabled: !!shopId
  });

  return (
    <Container x y gap={'$4'}>
      {query.data?.data.data.map((voucher) => (
        <VoucherItem key={voucher._id} voucher={voucher} />
      ))}
    </Container>
  );
}
