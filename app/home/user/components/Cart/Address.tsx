import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Icon,
  Text,
  VStack
} from '@/components';
import { useCartStore } from '@/configs/store/Cart.store';
import { EditIcon, MapPin } from 'lucide-react-native';
import { EditDeliveryAddress } from './EditDeliveryAddress';
import { If, Else, Then } from 'react-if';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/api';
import { asyncAction } from '@/utils/asyncAction';
export function Address() {
  const [showEditDASheet, setShowEditDASheet] = useState(false);
  const deliveryAddress = useCartStore.use.deliveryAddress();
  const setDeliveryAddress = useCartStore.use.setDeliveryAddress();

  function handleEdit() {
    setShowEditDASheet(true);
  }

  const callback = asyncAction(profileApi.getProfile, {
    onSuccess: (data) => {
      if (data.data.data.address)
        setDeliveryAddress({
          ...data.data.data.address,
          isPrimary: true,
          isDefault: true
        });
    }
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: callback,
    enabled: deliveryAddress === null,
    select: (data) => data.data.data.address
  });

  return (
    <>
      <EditDeliveryAddress
        showActionsheet={showEditDASheet}
        setShowActionsheet={setShowEditDASheet}
      />
      <HStack
        gap={'$4'}
        p="$4"
        borderWidth={1}
        rounded={'$lg'}
        borderColor="$borderLight200"
        w={'$full'}
      >
        <Box
          alignSelf="flex-start"
          rounded="$2xl"
          p={'$4'}
          bg="$backgroundLight100"
        >
          <Icon as={MapPin} size={'xl'} />
        </Box>
        <If condition={!!deliveryAddress}>
          <Then>
            <VStack flex={1} gap={'$1'}>
              <Text fontWeight="bold">{deliveryAddress?.name}</Text>
              <Text size="sm" fontWeight="bold">
                {deliveryAddress?.phone}
              </Text>
              <Text size="sm">{deliveryAddress?.address}</Text>
              <Text size="sm">{deliveryAddress?.city}</Text>
            </VStack>
          </Then>
          <Else>
            <VStack justifyContent="center" flex={1} gap={'$1'}>
              <Text fontWeight="bold">No address</Text>
              <Text>Please add an address</Text>
            </VStack>
          </Else>
        </If>
        <Button
          position="absolute"
          top={'$2'}
          right={'$3'}
          variant="link"
          size="xs"
          onPress={handleEdit}
        >
          <ButtonIcon as={EditIcon} />
        </Button>
      </HStack>
    </>
  );
}
