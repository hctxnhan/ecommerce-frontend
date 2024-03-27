import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack
} from '@/components';
import { getCurrency } from '@/utils/utils';
import React from 'react';
import { OrderReviewItem } from './OrderReviewItem';
import { Container } from '@/components/__custom__/Container';
import { OrderTotal } from './OrderTotal';

export function ReviewOrderSheet({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  return (
    <Actionsheet snapPoints={[80]} isOpen={showActionsheet}>
      <ActionsheetBackdrop
        onPress={() => {
          setShowActionsheet(false);
        }}
        backgroundColor="$backgroundLight500"
      />
      <ActionsheetContent
        p={0}
        backgroundColor="$backgroundLight100"
        borderRadius="$xl"
      >
        <ActionsheetSectionHeaderText>
          Review Order
        </ActionsheetSectionHeaderText>

        <ScrollView flex={1} w={'$full'}>
          <Container x flex={1}>
            <VStack pb={'$4'} gap={'$6'}>
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
              <OrderReviewItem />
            </VStack>
          </Container>
        </ScrollView>

        <Container x pBottom>
          <ActionsheetItem w="$full">
            <OrderTotal />
          </ActionsheetItem>
        </Container>

        <Button rounded={'$none'}>
          <ButtonText textAlign="center">Checkout</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
