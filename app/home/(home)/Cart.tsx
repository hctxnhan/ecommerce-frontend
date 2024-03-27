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
import { ShoppingCart } from 'lucide-react-native';
import { CartItem } from './components/Cart/CartItem';
import { useState } from 'react';
import { ReviewOrderSheet } from './components/Cart/ReviewOrderSheet';
import { Address } from './components/Cart/Address';
export default function Cart() {
  const [showPreview, setShowPreview] = useState(false);

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
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </VStack>
        </Container>
      </ScrollView>
      <Button
        onPress={() => setShowPreview(true)}
        bgColor="$primary500"
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
