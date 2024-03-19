import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText,
  Center,
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel
} from '@/components';
import React from 'react';

const sortByOptions = [
  {
    label: 'PRICE (low to high)',
    value: 'price-asc'
  },
  {
    label: 'PRICE (high to low)',
    value: 'price-desc'
  },
  {
    label: 'RATING (low to high)',
    value: 'rating-asc'
  },
  {
    label: 'RATING (high to low)',
    value: 'rating-desc'
  }
];

const categoryOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Electronics',
    value: 'electronics'
  },
  {
    label: 'Clothes',
    value: 'clothes'
  },
  {
    label: 'Furniture',
    value: 'furniture'
  }
];

export function SortFilter() {
  const [values, setValues] = React.useState(sortByOptions[0].value);
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  return (
    <Center>
      <Button onPress={() => setShowActionsheet(true)}>
        <ButtonText>Open</ButtonText>
      </Button>
      <Actionsheet isOpen={showActionsheet}>
        <ActionsheetBackdrop
          onPress={() => {
            setShowActionsheet(false);
          }}
          backgroundColor="$backgroundLight500"
        />
        <ActionsheetContent
          p={'$6'}
          backgroundColor="$backgroundLight100"
          borderRadius="$xl"
        >
          <ActionsheetSectionHeaderText>Sort</ActionsheetSectionHeaderText>
          <ActionsheetItem w="$full" flexDirection="column">
            <RadioGroup gap={'$3'} value={values} onChange={setValues}>
              {sortByOptions.map((option) => (
                <Radio
                  width="$full"
                  key={option.value}
                  value={option.value}
                  accessibilityLabel="Radio"
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <RadioLabel textAlignVertical="center">
                      {option.label}
                    </RadioLabel>

                    <RadioIndicator>
                      <RadioIcon>
                        <CircleIcon size="md" color="$primary500" />
                      </RadioIcon>
                    </RadioIndicator>
                  </HStack>
                </Radio>
              ))}
            </RadioGroup>
          </ActionsheetItem>
          {/* <ActionsheetSectionHeaderText
            backgroundColor="$secondary200"
            w={'$full'}
            rounded="$xl"
            textAlign="center"
            overflow="hidden"
            mt={'$6'}
          >
            Filter
          </ActionsheetSectionHeaderText>
          <ActionsheetItem w="$full" flexDirection="column">
            <RadioGroup
              gap={'$3'}
              value={categoryValues}
              onChange={setCategoryValues}
            >
              {categoryOptions.map((option) => (
                <Radio
                  width="$full"
                  key={option.value}
                  value={option.value}
                  accessibilityLabel="Radio"
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <RadioLabel textAlignVertical="center">
                      {option.label}
                    </RadioLabel>

                    <RadioIndicator>
                      <RadioIcon>
                        <CircleIcon size="md" color="$primary500" />
                      </RadioIcon>
                    </RadioIndicator>
                  </HStack>
                </Radio>
              ))}
            </RadioGroup>
          </ActionsheetItem> */}
        </ActionsheetContent>
      </Actionsheet>
    </Center>
  );
}
