import { shopApi } from '@/api';
import { Container } from '@/components/__custom__/Container';
import { useQuery } from '@tanstack/react-query';
import { VoucherItem } from '../components/VoucherItem';
import { UserRole } from '@/types';

interface VoucherListProps {
  shopId: string;
  viewAs?: UserRole;
}

export function VoucherList({ shopId, viewAs }: VoucherListProps) {
  const query = useQuery({
    queryKey: ['shop-vouchers', { id: shopId }],
    queryFn: () => shopApi.getDiscounts(shopId),
    enabled: !!shopId
  });

  return (
    <Container x y gap={'$4'}>
      {query.data?.data.data.map((voucher) => (
        <VoucherItem
          canApply={viewAs === UserRole.USER}
          canCopy={viewAs === UserRole.USER}
          key={voucher._id}
          voucher={voucher}
        />
      ))}
    </Container>
  );
}
