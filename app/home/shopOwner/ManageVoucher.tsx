import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { useProfile } from '@/hooks/useProfile';
import { ShopRequestStatus } from '@/types';
import { useState } from 'react';
import { VoucherList } from '../shop/components/VoucherList';

export default function ManageVoucher() {
  const [segment, setSegment] = useState(ShopRequestStatus.PENDING);
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return null;
  }

  return (
    <SafeAreaView flex={1}>
      <Container x y>
        <SegmentedButtonGroup
          value={segment}
          onChange={setSegment as (value: string) => void}
        >
          <SegmentedButton value={ShopRequestStatus.PENDING}>
            Active
          </SegmentedButton>
          <SegmentedButton value={ShopRequestStatus.APPROVED}>
            Inactive
          </SegmentedButton>
          <SegmentedButton value={ShopRequestStatus.APPROVED}>
            Expired
          </SegmentedButton>
        </SegmentedButtonGroup>
      </Container>
      <VoucherList shopId={profile?._id} />
    </SafeAreaView>
  );
}
