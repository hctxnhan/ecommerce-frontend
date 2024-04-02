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
import { useSearchStore } from '@/configs/store/Search.store';
import React, { useState } from 'react';

const sortByOptions = [
  {
    label: 'NEWEST',
    value: 'newest-desc'
  },
  {
    label: 'OLDEST',
    value: 'newest-asc'
  },
  {
    label: 'CHEAPEST',
    value: 'price-asc'
  },
  {
    label: 'MOST EXPENSIVE',
    value: 'price-desc'
  },
  {
    label: 'HIGHEST RATING',
    value: 'rating-asc'
  },
  {
    label: 'LOWEST RATING',
    value: 'rating-desc'
  }
];

export function SortFilter({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  const setSort = useSearchStore.use.setSort();
  const sortOption = useSearchStore.use.sort();

  return (
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
          <RadioGroup
            w="$full"
            gap={'$3'}
            value={sortOption}
            onChange={setSort}
          >
            {sortByOptions.map((option) => (
              <Radio
                width="$full"
                key={option.value}
                value={option.value}
                accessibilityLabel="Radio"
              >
                <HStack
                  flex={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
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
  );
}
