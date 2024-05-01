import { shopApi } from '@/api';
import { FlatList } from '@/components';
import { Discount, UserRole, VoucherStatus } from '@/types';
import { useToken } from '@gluestack-style/react';
import { useQuery } from '@tanstack/react-query';
import { RefreshControl } from 'react-native-gesture-handler';
import { VoucherItem } from '../components/VoucherItem';

interface VoucherListProps {
  shopId: string;
  viewAs?: UserRole;
  status?: VoucherStatus;
  onPress?: (voucher: Discount) => void;
}

export function VoucherList({
  shopId,
  viewAs,
  onPress,
  status = VoucherStatus.ACTIVE
}: VoucherListProps) {
  const query = useQuery({
    queryKey: ['shop-vouchers', { id: shopId, status }],
    queryFn: () => shopApi.getDiscounts({ shopId, status }),
    enabled: !!shopId
  });

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
      data={query.data?.data.data}
      renderItem={({ item }) => (
        <VoucherItem
          canApply={viewAs === UserRole.USER}
          canCopy={viewAs === UserRole.USER}
          key={item._id}
          voucher={item as Discount}
          onPress={() => onPress?.(item as Discount)}
        />
      )}
      keyExtractor={(item) => (item as Discount)._id}
      refreshControl={
        <RefreshControl
          refreshing={query.isFetching}
          onRefresh={query.refetch}
        />
      }
    />
  );
}
