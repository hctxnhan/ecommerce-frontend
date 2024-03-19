import {
  Button,
  ButtonIcon,
  GripVerticalIcon,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon
} from '@/components';
import React from 'react';

export function SearchBar() {
  const [value, setValue] = React.useState('');
  return (
    <Input
      borderColor="$backgroundLight100"
      flexDirection="row"
      borderWidth={2}
    >
      <InputSlot flexDirection="row">
        <InputIcon as={SearchIcon} ml="$4" />
      </InputSlot>
      <InputField
        flex={1}
        onChange={(e: any) => {
          setValue(e.nativeEvent.text);
        }}
        value={value}
        placeholder="Search"
      />
      <InputSlot flexDirection="row">
        <Button variant="outline" px={'$4'} borderColor="transparent">
          <ButtonIcon color="$secondary500" as={GripVerticalIcon} />
        </Button>
      </InputSlot>
    </Input>
  );
}
