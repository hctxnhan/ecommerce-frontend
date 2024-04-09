import { shopApi } from '@/api';
import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  HStack,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { ShopRequest, ShopRequestStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, CheckCircle, XCircle } from 'lucide-react-native';

interface ShopRequestItemProps {
  item: ShopRequest;
  isAdmin?: boolean;
}

export function ShopRequestItem({
  item,
  isAdmin = false
}: ShopRequestItemProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const confirmRequest = useMutation({
    mutationFn: shopApi.confirmShopRequest,
    onSuccess: () => {
      queryClient.setQueryData(['shopRequests'], (data: ShopRequest[]) => {
        console.log(data, item._id);
        return data.filter((request) => request._id !== item._id);
      });

      toast.show({
        title: 'Request confirmed',
        type: 'success',
        description: 'Shop has been created successfully'
      });
    },
    onError: () => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: 'Something went wrong'
      });
    }
  });

  function handleConfirmRequest(status: 'approved' | 'rejected') {
    confirmRequest.mutate({
      requestId: item._id,
      status
    });
  }

  return (
    <Container w="$full" flex={1}>
      {isAdmin &&
        item.status ===
          ShopRequestStatus.PENDING && (
            <VStack
              zIndex={10}
              alignItems="flex-start"
              position="absolute"
              right={'$3'}
              top={'$2'}
            >
              <Button
                onPress={() => handleConfirmRequest('approved')}
                size="xs"
                variant="link"
              >
                <ButtonIcon as={CheckCircle} color="$green600" />
              </Button>
              <Button
                onPress={() => handleConfirmRequest('rejected')}
                size="xs"
                variant="link"
              >
                <ButtonIcon as={XCircle} color="$red600" />
              </Button>
            </VStack>
          )}
      <HStack
        p="$2"
        borderWidth={1}
        rounded={'$lg'}
        borderColor="$borderLight200"
        alignItems="center"
        gap={'$3'}
        w={'$full'}
      >
        <VStack gap={'$1'} flex={1}>
          <Text color="$primary500" fontWeight="bold" size="2xl">
            {item.shopName}
          </Text>
          <Text size="xs" color="$text900">
            {item.shopDescription}
          </Text>
          <Text size="xs" color="$text400">
            {item.shopAddress}
          </Text>
          <Badge
            p={'$1'}
            variant="solid"
            alignSelf="flex-start"
            action="success"
          >
            <BadgeText>{item.status}</BadgeText>
          </Badge>
        </VStack>
      </HStack>
    </Container>
  );
}
