import { cartApi } from '@/api';
import {
  Button,
  ButtonText,
  HStack,
  Icon,
  SafeAreaView,
  ScrollView,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ShoppingBag, ShoppingCart } from 'lucide-react-native';
import { useState } from 'react';
import { Address } from './components/Cart/Address';
import { CartItem } from './components/Cart/CartItem';
import { EmptyCartModal } from './components/Cart/EmptyCartModal';
import { ReviewOrderSheet } from './components/Cart/ReviewOrderSheet';
import { VoucherInput } from './components/Cart/VoucherInput';

export default function Cart() {
  const [showPreview, setShowPreview] = useState(false);

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    select: (data) => data.data.data
  });

  return (
    <SafeAreaView flex={1}>
      <ReviewOrderSheet
        showActionsheet={showPreview}
        setShowActionsheet={setShowPreview}
      />
      <Container x y py={'$2'}>
        <HStack alignItems="center" gap={'$3'}>
          <Icon size={30} as={ShoppingCart} />
          <Text fontSize={'$2xl'} fontWeight={'bold'}>
            My Cart
          </Text>
        </HStack>
      </Container>
      <ScrollView>
        <Container x flex={1}>
          <VStack py="$4" gap={'$4'}>
            <Address />
            {!!cartQuery.data?.count && <EmptyCartModal />}
            {cartQuery.data?.items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
            {!!cartQuery.data?.total && <VoucherInput />}
          </VStack>
          {!cartQuery.data?.count && (
            <VStack gap={'$4'} mt={'$10'} alignItems="center">
              <Icon as={ShoppingBag} size={100} color="$secondary200" />
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize={'$3xl'}
                textAlign="center"
                color="$secondary200"
              >
                empty
              </Text>
              <Button
                onPress={() => router.push('/home/')}
                variant="link"
                action="primary"
              >
                <ButtonText textAlign="center">Continue shopping</ButtonText>
              </Button>
            </VStack>
          )}
        </Container>
      </ScrollView>
      <Button
        disabled={!cartQuery.data?.count}
        onPress={() => setShowPreview(true)}
        size="xl"
        rounded="$none"
      >
        <ButtonText textTransform="uppercase" textAlign="center">
          Review order
        </ButtonText>
      </Button>
    </SafeAreaView>
  );
}
