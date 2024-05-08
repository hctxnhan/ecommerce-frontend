import { shopApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ShopRequestItem } from '../profile/components/ShopRequestItem';
import { Box, Center, Divider, Icon, SafeAreaView, Text } from '@/components';
import { Container } from '@/components/__custom__/Container';
import {
  SegmentedButton,
  SegmentedButtonGroup
} from '@/components/__custom__/SegmentedButton';
import { ShopRequestStatus } from '@/types';
import { useState } from 'react';
import { MessageCircleXIcon } from 'lucide-react-native';
// import Balancer from 'react-wrap-balancer';

export default function request() {
  const [segment, setSegment] = useState(ShopRequestStatus.PENDING);

  const adminRequest = useQuery({
    queryFn: () =>
      shopApi.getShopRegistrationRequests({
        status: segment
      }),
    queryKey: [
      'shopRequests',
      {
        status: segment
      }
    ],
    select: (data) => data.data
  });

  return (
    <SafeAreaView flex={1}>
      <Container x y flex={1}>
        <SegmentedButtonGroup
          value={segment}
          onChange={setSegment as (value: string) => void}
        >
          <SegmentedButton value={ShopRequestStatus.PENDING}>
            Pending
          </SegmentedButton>
          <SegmentedButton value={ShopRequestStatus.APPROVED}>
            Approved
          </SegmentedButton>
          <SegmentedButton value={ShopRequestStatus.REJECTED}>
            Rejected
          </SegmentedButton>
        </SegmentedButtonGroup>
        {!adminRequest.isLoading && !adminRequest.data?.data.length && (
          <Center flex={1} h={'$full'} gap={'$4'}>
            <Icon as={MessageCircleXIcon} size="6xl" color={'$text500'} />
            <Text textAlign="center">
              {/* <Balancer>No {segment} requests</Balancer> */}
            </Text>
          </Center>
        )}
        <Box py={4} />
        {adminRequest.data?.data.map((request) => (
          <ShopRequestItem isAdmin key={request._id} item={request} />
        ))}
      </Container>
    </SafeAreaView>
  );
}
