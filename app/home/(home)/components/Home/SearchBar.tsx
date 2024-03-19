import {
  Button,
  ButtonIcon,
  GripVerticalIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon
} from '@/components';
import React, { useState } from 'react';
import { SortFilter } from './SortFilter';

export function SearchBar() {
  const [value, setValue] = useState('');
  const [showActionsheet, setShowActionsheet] = useState(false);

  return (
    <>
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
          <Button
            onPress={() => setShowActionsheet(true)}
            variant="outline"
            px={'$4'}
            borderColor="transparent"
          >
            <ButtonIcon color="$secondary500" as={GripVerticalIcon} />
          </Button>
        </InputSlot>
      </Input>
      <SortFilter
        showActionsheet={showActionsheet}
        setShowActionsheet={setShowActionsheet}
      />
    </>
  );
}
