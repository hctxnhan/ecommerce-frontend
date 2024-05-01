import {
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  VStack
} from '@/components';

const options = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothes', value: 'clothes' },
  { label: 'Furniture', value: 'furniture' }
];

interface SelectCategoryInputProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export function SelectCategoryInput({
  selectedCategories,
  setSelectedCategories
}: SelectCategoryInputProps) {
  return (
    <VStack
      maxHeight={200}
      borderWidth={1}
      borderColor="$borderLight900"
      rounded={'$lg'}
      p={'$3'}
      bg="$backgroundLight50"
    >
      <CheckboxGroup
        value={selectedCategories}
        onChange={(keys) => {
          setSelectedCategories(keys);
        }}
      >
        <VStack space="md">
          {options.map((option) => (
            <Checkbox value={option.value} key={option.value}>
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>{option.label}</CheckboxLabel>
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
    </VStack>
  );
}
