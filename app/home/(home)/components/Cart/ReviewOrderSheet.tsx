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
  Text,
  VStack
} from '@/components';
import { getCurrency } from '@/utils/utils';
import React from 'react';

export function ReviewOrderSheet({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  return (
    <Actionsheet isOpen={showActionsheet}>
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
        <ActionsheetSectionHeaderText>Add to cart</ActionsheetSectionHeaderText>
        <ActionsheetItem w="$full" flexDirection="column">
          <HStack
            p="$2"
            borderWidth={1}
            rounded={'$lg'}
            borderColor="$borderLight200"
            alignItems="center"
            gap={'$3'}
            w={'$full'}
          >
            <Image
              rounded={'$lg'}
              source={{ uri: 'https://via.placeholder.com/150' }}
              w={120}
              h={120}
              objectFit="cover"
              alt="Product image"
            />

            <VStack gap={'$1'}>
              <Text size="lg" fontWeight="bold">
                Variegated snake
              </Text>
              <Text color="$primary500" fontWeight="bold" size="2xl">
                {getCurrency(20)}
              </Text>
            </VStack>
          </HStack>
        </ActionsheetItem>

        <Button rounded={'$none'}>
          <ButtonText textAlign="center">Yes, remove!</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
