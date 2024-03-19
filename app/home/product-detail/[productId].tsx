import {
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { getCurrency } from '@/utils/utils';
import { useToken } from '@gluestack-style/react';
import { BadgeCheck } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductId() {
  const greenToken = useToken('colors', 'green500');

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        flex: 1
      }}
    >
      <VStack flex={1}>
        <VStack flex={1}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              <BadgeText color="$text0">Electronics</BadgeText>
            </Badge>
            <Text mb={'$1'} fontWeight="bold" size="2xl">
              TV Samsung 52inch
            </Text>
            <Text fontWeight="bold" size="xl" color="$primary500">
              {getCurrency(1000)}
            </Text>
          </Container>

          <Container x pTop>
            <HStack alignItems="center" gap="$1">
              <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
              </Avatar>
              <VStack gap={'$1'}>
                <Text ml={'$2'} fontWeight="bold">
                  Sandeep Srivastava
                </Text>
                <HStack alignItems="center" gap={'$1'}>
                  <Text ml={'$2'} size="sm">
                    Verified store
                  </Text>
                  <BadgeCheck size={18} color={greenToken} />
                </HStack>
              </VStack>
            </HStack>
          </Container>

          <Container x pTop>
            <Text size="lg" fontWeight="bold" mb={'$2'}>
              Description
            </Text>
            <Text size="md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Container>
          <Container x pTop>
            <Text size="lg" fontWeight="bold" mb={'$2'}>
              Product attributes
            </Text>
            <Box>
              <Text>
                In stock: <Text color="$green500">Yes</Text>
              </Text>
              <Text>
                Color: <Text color="$primary500">Black</Text>
              </Text>
              <Text>
                Size: <Text color="$primary500">52inch</Text>
              </Text>
            </Box>
          </Container>

          <Container x pTop></Container>
        </VStack>
        <Button size="xl" rounded="$none">
          <ButtonText textAlign="center">Add to cart</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
