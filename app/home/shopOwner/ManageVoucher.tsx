import { Divider, SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { ShopRequestStatus } from '@/types';
import { useState } from 'react';

export default function ManageVoucher() {
  const [segment, setSegment] = useState(ShopRequestStatus.PENDING);

  return (
    <SafeAreaView flex={1}>
      <Container x y flex={1}>
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
        <Divider py={'$2'} />
      </Container>
    </SafeAreaView>
  );
}
