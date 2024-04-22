import {
  Button,
  HStack,
  Icon,
  SafeAreaView,
  ScrollView,
  Text
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { NavigateButton } from '@/components/__custom__/NavigateButton';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { ProductList } from '../../user/components/Home/ProductList';
import { ShopDetail } from '../components/ShopDetail';
import { productApi, shopApi } from '@/api';
import { ShopBadge } from '../../product-detail/components/ShopBadge';

export default function ShopId() {
  const { shopId } = useLocalSearchParams<{
    shopId: string;
  }>();

  const products = useQuery({
    queryFn: () =>
      productApi.getProducts({
        shopId,
        limit: 10,
        page: 1,
        category: 'all',
        search: ''
      }),
    queryKey: ['shop-latest-products', { shopId }],
    select: (data) => data.data
  });

  const detail = useQuery({
    queryFn: () => shopApi.getShop(shopId),
    queryKey: ['shop-detail', { shopId }],
    select: (data) => data.data.data
  });

  return (
    <SafeAreaView flex={1}>
      {/* <ViewImageModal
        image="https://via.placeholder.com/150"
        onClose={() => console.log('close')}
      /> */}
      <ScrollView>
        {detail.data && (
          <Container x y>
            <ShopBadge
              shopId={shopId}
              shopName={detail.data.name}
              shopVerified={detail.data.verified}
            />
          </Container>
        )}

        <Container x pBottom>
          <NavigateButton
            onPress={() => router.push(`/home/shop/${shopId}/voucher`)}
          >
            Shop vouchers
          </NavigateButton>
        </Container>

        <Container
          py={'$6'}
          bg="$backgroundLight100"
          borderTopLeftRadius={'$2xl'}
          borderTopRightRadius={'$2xl'}
        >
          <Container x y>
            <HStack
              pb={'$2'}
              flex={1}
              borderBottomWidth={1}
              borderBottomColor="$borderLight200"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text size="xl" flex={1} fontWeight="bold" color="$text400">
                Popular products
              </Text>
              <Button zIndex={100} size="sm" action="secondary" variant="link">
                <HStack alignItems="center" gap={'$1'}>
                  <Text
                    color="$primary500"
                    fontWeight="bold"
                    size="sm"
                    textAlign="right"
                  >
                    View all
                  </Text>
                  <Icon size="xl" as={ChevronRight} />
                </HStack>
              </Button>
            </HStack>
          </Container>
          <ProductList onReachEnd={() => {}} pages={products.data?.data} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
