import {
  Box,
  Radio,
  RadioGroup,
  ScrollView,
  Text
} from '@/components';
import { useSearchStore } from '@/configs/store/Search.store';

const categoryFilter = [
  {
    name: 'All',
    value: 'all'
  },
  {
    name: 'Clothes',
    value: 'clothes'
  },
  {
    name: 'Electronics',
    value: 'electronics'
  },
  {
    name: 'Furniture',
    value: 'furniture'
  }
];

export function CategoryFilter() {
  const category = useSearchStore.use.category();
  const setCategory = useSearchStore.use.setCategory();

  return (
    <ScrollView
      px={'$6'}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <RadioGroup
        flexDirection="row"
        gap={'$3'}
        value={category}
        onChange={setCategory}
      >
        {categoryFilter.map((option) => {
          const isSelected = category === option.value;

          return (
            <Radio
              w={'auto'}
              key={option.value}
              value={option.value}
              accessibilityLabel="Radio"
            >
              <Box
                backgroundColor={
                  isSelected ? '$primary500' : '$backgroundLight0'
                }
                minWidth={'$20'}
                borderWidth={2}
                borderColor={isSelected ? '$primary500' : '$backgroundLight100'}
                px={'$5'}
                py={'$3'}
                borderRadius="$3xl"
              >
                <Text
                  size="sm"
                  textAlign="center"
                  color={
                    isSelected ? '$backgroundLight50' : '$backgroundLight900'
                  }
                >
                  {option.name}
                </Text>
              </Box>
            </Radio>
          );
        })}
      </RadioGroup>
    </ScrollView>
  );
}
