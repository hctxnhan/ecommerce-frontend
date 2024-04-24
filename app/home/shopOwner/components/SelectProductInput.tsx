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
  Text,
  VStack
} from '@/components';
import { Product } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const products = [
  [
    { _id: 1, name: 'Product 1' },
    { _id: 2, name: 'Product 2' },
    { _id: 3, name: 'Product 3' }
  ],
  [
    { _id: 4, name: 'Product 4' },
    { _id: 5, name: 'Product 5' },
    { _id: 6, name: 'Product 6' }
  ],
  [
    { _id: 7, name: 'Product 7' },
    { _id: 8, name: 'Product 8' },
    { _id: 9, name: 'Product 9' }
  ]
];

export function SelectProductInput() {
  const [selectedProduct, setSelectedProduct] = useState<Product[] | null>(
    null
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  function onChangePage(offset: number) {
    const newPage = page + offset;
    if (newPage >= 1 && newPage <= products.length) {
      setPage(newPage);
    }
  }

  // const query = useInfiniteQuery({
  //   queryKey: ['my-products', { search }],
  //   queryFn: ({ pageParam }) =>
  //     productApi.myProducts({
  //       page: pageParam,
  //       search,
  //       limit: 6,
  //       status: 'published'
  //     }),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => {
  //     if (
  //       lastPage.data.metadata.pagination.total >=
  //       lastPage.data.metadata.pagination.limit
  //     ) {
  //       return lastPage.data.metadata.pagination.page + 1;
  //     }
  //   }
  // });

  // const products = query.data?.pages.flatMap((page) => page.data.data);

  return (
    <VStack>
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
      </Input>

      <VStack
        maxHeight={200}
        borderWidth={1}
        borderColor="$borderLight900"
        rounded={'$lg'}
        p={'$3'}
        bg="$backgroundLight50"
      >
        <CheckboxGroup
          value={selectedProduct?.map((product) => product._id) || []}
          onChange={(keys) => {
            setSelectedProduct(
              products.flat().filter((product) => keys.includes(product._id))
            );
          }}
        >
          <VStack space="md">
            {products[page - 1].map((option) => (
              <Checkbox value={option._id} key={option._id}>
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>{option.name}</CheckboxLabel>
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
        <HStack mt={'$3'} gap={'$4'}>
          <Button onPress={() => onChangePage(-1)} h={'$3'} variant="link">
            <ButtonText>Previous</ButtonText>
          </Button>
          <Button h={'$3'} variant="link" onPress={() => onChangePage(1)}>
            <ButtonText>Next</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
