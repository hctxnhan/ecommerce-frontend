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
export default function Cart() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <SafeAreaView flex={1}>
      <ReviewOrderSheet
        showActionsheet={showPreview}
        setShowActionsheet={setShowPreview}
      />
      <Container x flex={1}>
        <HStack alignItems="center" gap={'$3'} mb="$2">
          <Icon size={30} as={ShoppingCart} />
          <Text fontSize={'$2xl'} fontWeight={'bold'}>
            My Cart
          </Text>
        </HStack>
        <ScrollView pt="$6">
          <VStack gap={'$4'}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </VStack>
        </ScrollView>
      </Container>
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
