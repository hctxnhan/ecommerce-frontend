import { shopApi } from '@/api';
import { Center, Icon, SafeAreaView, Text } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useQuery } from '@tanstack/react-query';
import { MessageCircleXIcon } from 'lucide-react-native';
import Balancer from 'react-wrap-balancer';
import { ShopRequestItem } from './components/ShopRequestItem';

export default function RequestHistory() {
  const query = useQuery({
    queryKey: ['my-shop-request-history'],
    queryFn: shopApi.getMyShopRegistrationRequest,
    select: (data) => data.data.data
  });
  
  return (
    <SafeAreaView flex={1}>
      <Container flex={1} x y gap={'$8'} w="$full">
        {!query.isLoading && !query.data?.length && (
          <Center h={'$full'} gap={'$4'}>
            <Icon as={MessageCircleXIcon} size="6xl" color={'$text500'} />
            <Text textAlign="center">
              <Balancer>
                You did not make any shop registration request yet.
              </Balancer>
            </Text>
          </Center>
        )}
        {query.data?.map((shop) => (
          <ShopRequestItem item={shop} key={shop._id} />
        ))}
      </Container>
    </SafeAreaView>
  );
}
