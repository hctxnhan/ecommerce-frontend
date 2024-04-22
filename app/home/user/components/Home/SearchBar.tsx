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
import React, { useEffect, useState } from 'react';
import { SortFilter } from './SortFilter';
import { useSearchStore } from '@/configs/store/Search.store';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const setSearchToStore = useSearchStore.use.setSearch();
  const searchInStore = useSearchStore.use.search();

  const [search, setSearch] = useState(searchInStore);
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearchToStore(debounceSearch);
  }, [debounceSearch]);

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
            setSearch(e.nativeEvent.text);
          }}
          value={search}
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
