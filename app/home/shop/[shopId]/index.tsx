import {
  Button,
  Center,
  HStack,
  Icon,
  SafeAreaView,
  ScrollView,
  Text
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { ChevronRight } from 'lucide-react-native';
import { ProductList } from '../../(home)/components/Home/ProductList';
import { ShopDetail } from '../components/ShopDetail';
import { router } from 'expo-router';
import { NavigateButton } from '@/components/__custom__/NavigateButton';
import { ViewImageModal } from '@/components/__custom__/ViewImageModal';

export default function ShopId() {
  return (
    <SafeAreaView flex={1}>
      <Text>ShopId</Text>
      <ViewImageModal
        image="https://via.placeholder.com/150"
        onClose={() => console.log('close')}
      />
      {/* <ScrollView>
        <ShopDetail />

        <Container x pBottom>
          <NavigateButton
            onPress={() => router.push('/home/shop/1234/voucher')}
          >
            Shop vouchers
          </NavigateButton>
        </Container>

        <Container
          x
          y
          py={'$6'}
          bg="$backgroundLight100"
          borderTopLeftRadius={'$2xl'}
          borderTopRightRadius={'$2xl'}
        >
          <HStack
            mb={'$4'}
            pb={'$2'}
            flex={1}
            borderBottomWidth={1}
            borderBottomColor="$borderLight200"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text size="xl" flex={1} fontWeight="bold" color="$text400">
              Popular products
            </Text>
            <Button zIndex={100} size="sm" action="secondary" variant="link">
              <HStack alignItems="center" gap={'$1'}>
                <Text
                  color="$primary500"
                  fontWeight="bold"
                  size="sm"
                  textAlign="right"
                >
                  View all
                </Text>
                <Icon size="xl" as={ChevronRight} />
              </HStack>
            </Button>
          </HStack>
          <ProductList />
        </Container>
      </ScrollView> */}
    </SafeAreaView>
  );
}
