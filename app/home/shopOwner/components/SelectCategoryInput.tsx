import {
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  VStack
} from '@/components';
import { useState } from 'react';

const options = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothes', value: 'clothes' },
  { label: 'Furniture', value: 'furniture' }
];

export function SelectCategoryInput() {
  const [values, setValues] = useState(['UX Research']);
  return (
    <CheckboxGroup
      value={values}
      onChange={(keys) => {
        setValues(keys);
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
  );
}
