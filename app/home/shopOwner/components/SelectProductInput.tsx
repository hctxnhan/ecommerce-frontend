import { productApi } from '@/api';
import {
  Button,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  VStack
} from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface SelectProductInputProps {
  selectedProducts: string[];
  setSelectedProducts: (productIds: string[]) => void;
}

export function SelectProductInput({
  selectedProducts,
  setSelectedProducts
}: SelectProductInputProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ['my-products', { search, page }],
    queryFn: () =>
      productApi.myProducts({
        page,
        search,
        limit: 10,
        status: 'published'
      }),
    select: (data) => data.data
  });

  const data = query.data?.data;
  const metadata = query.data?.metadata;

  function handleChangePage(offset: number) {
    if (!data) return;

    const newPage = page + offset;

    if (
      newPage > 0 ||
      (metadata && metadata.pagination.total >= metadata.pagination.limit)
    ) {
      setPage(newPage);
      query.refetch();
    }
  }

  return (
    <VStack
      maxHeight={200}
      borderWidth={1}
      borderColor="$borderLight900"
      rounded={'$lg'}
      p={'$3'}
      bg="$backgroundLight50"
    >
      <Input
        mb={'$3'}
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
      </Input>
      <CheckboxGroup
        value={selectedProducts ?? []}
        onChange={(keys: string[]) => setSelectedProducts(keys)}
      >
        <VStack space="md">
          {data?.map((option) => (
            <Checkbox value={option._id.toString()} key={option._id}>
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>{option.name}</CheckboxLabel>
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
      <HStack mt={'$3'} gap={'$4'}>
        <Button onPress={() => handleChangePage(-1)} h={'$3'} variant="link">
          <ButtonText>Previous</ButtonText>
        </Button>
        <Button h={'$3'} variant="link" onPress={() => handleChangePage(1)}>
          <ButtonText>Next</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
}
