import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { useProfile } from '@/hooks/useProfile';
import { Discount, VoucherStatus } from '@/types';
import { useState } from 'react';
import { VoucherList } from '../shop/components/VoucherList';
import { CreateVoucherSheet } from './components/CreateVoucherSheet';
import { VoucherItemModal } from './components/VoucherItemModal';

export default function ManageVoucher() {
  const [segment, setSegment] = useState(VoucherStatus.ACTIVE);
  const { profile, isLoading } = useProfile();
  const [selectedVoucher, setSelectedVoucher] = useState<Discount | null>(null);

  if (isLoading || !profile) {
    return null;
  }

  return (
    <SafeAreaView flex={1}>
      <CreateVoucherSheet />
      <Container x pTop>
        <SegmentedButtonGroup
          value={segment}
          onChange={setSegment as (value: string) => void}
        >
          <SegmentedButton value={VoucherStatus.ACTIVE}>Active</SegmentedButton>
          <SegmentedButton value={VoucherStatus.INACTIVE}>
            Inactive
          </SegmentedButton>
          <SegmentedButton value={VoucherStatus.EXPIRED}>
            Expired
          </SegmentedButton>
        </SegmentedButtonGroup>
      </Container>
      <VoucherList
        status={segment}
        onPress={(voucher) => setSelectedVoucher(voucher)}
        shopId={profile?._id}
      />

      {selectedVoucher && (
        <VoucherItemModal
          onClose={() => setSelectedVoucher(null)}
          open={!!selectedVoucher}
          voucher={selectedVoucher}
        />
      )}
    </SafeAreaView>
  );
}
