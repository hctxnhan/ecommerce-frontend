import { productApi } from '@/api/product';
import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { NavigateButton } from '@/components/__custom__/NavigateButton';
import { Rating } from '@/components/__custom__/Rating';
import { getCurrency } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { AddToCartSheet } from '../components/AddToCartSheet';
import { ShopBadge } from '../components/ShopBadge';
import { IfRole } from '@/components/__custom__/Auth';
import { UserRole } from '@/types';
import { useCommentStore } from '@/configs/store/Comment.store';

export default function ProductId() {
  const clearOrderItem = useCommentStore.use.clearOrderItemId();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const params = useLocalSearchParams<{
    productId: string;
  }>();

  const { data: product } = useQuery({
    queryKey: ['product', { id: params.productId }],
    queryFn: productApi.getProductById.bind(null, params.productId)
  });

  const productDetail = product?.data.data;

  return (
    <SafeAreaView flex={1}>
      <ScrollView flex={1}>
        <ScrollView h={300} horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} w={300} h={300} overflow="hidden">
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                w={'$full'}
                h={'$full'}
                objectFit="cover"
              />
            </Box>
          ))}
        </ScrollView>

        <Container x pTop py="$6">
          <Badge
            alignSelf="flex-start"
            w={'auto'}
            size="lg"
            variant="solid"
            bgColor="$green600"
            borderRadius="$md"
            action="success"
            mb={'$1'}
          >
            <BadgeText color="$text0">{productDetail?.type}</BadgeText>
          </Badge>
          <Text mb={'$1'} fontWeight="bold" size="2xl">
            {productDetail?.name}
          </Text>
          <Text fontWeight="bold" size="xl" color="$primary500">
            {productDetail?.price && getCurrency(productDetail.price)}
          </Text>
          <Rating long mt={'$1'} rating={4} size="md" />
        </Container>

        {productDetail?.owner && (
          <Pressable
            onPress={() =>
              router.push(`/home/shop/${productDetail.owner._id}/`)
            }
          >
            <Container x y>
              <ShopBadge
                shopId={productDetail.owner._id}
                shopName={productDetail.owner.shop.name}
                shopVerified={productDetail.owner.verified}
              />
            </Container>
          </Pressable>
        )}

        <Container x pTop>
          <Text size="lg" fontWeight="bold" mb={'$2'}>
            Description
          </Text>
          <Text size="md">{productDetail?.description}</Text>
        </Container>
        <Container x pTop>
          <Text size="lg" fontWeight="bold" mb={'$2'}>
            Product attributes
          </Text>
          <Box>
            {Object.entries(productDetail?.attributes || {}).map(
              ([key, value]) => (
                <HStack key={key} gap={'$1'}>
                  <Text textTransform="capitalize" fontWeight="bold">
                    {key}:
                  </Text>
                  <Text>{value}</Text>
                </HStack>
              )
            )}
          </Box>
        </Container>

        <Container x y>
          <NavigateButton
            onPress={() => {
              clearOrderItem();
              router.push(`/home/product-detail/${params.productId}/comment/`);
            }}
          >
            Reviews
          </NavigateButton>
        </Container>
      </ScrollView>

      <IfRole is={UserRole.USER}>
        <Button
          onPress={() => setShowActionsheet(true)}
          bgColor="$primary500"
          size="xl"
          rounded="$none"
        >
          <ButtonText textTransform="uppercase" textAlign="center">
            Add to cart
          </ButtonText>
        </Button>

        {productDetail && (
          <AddToCartSheet
            product={productDetail}
            setShowActionsheet={setShowActionsheet}
            showActionsheet={showActionsheet}
          />
        )}
      </IfRole>
    </SafeAreaView>
  );
}
