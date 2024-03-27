import {
  Button,
  ButtonIcon,
  ArrowLeftIcon,
  HStack,
  SafeAreaView,
  Text,
  Box
} from '@/components';
import { router } from 'expo-router';

export function CustomHeader(props) {
  return (
    <SafeAreaView>
      <HStack
        px={'$4'}
        backgroundColor="$backgroundLight0"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={1}
        borderBottomColor="$borderLight100"
      >
        <Button
          w={'$10'}
          h={'$10'}
          zIndex={1}
          onPress={() => {
            router.canGoBack() && router.back();
          }}
          variant="link"
        >
          {router.canGoBack() && (
            <ButtonIcon
              color="$backgroundLight950"
              size="xl"
              as={ArrowLeftIcon}
            />
          )}
        </Button>
        <Text
          flex={1}
          fontWeight="bold"
          textTransform="uppercase"
          w="$full"
          textAlign="center"
          textAlignVertical="center"
        >
          {props.options.title}
        </Text>
        <Box w="$10" />
      </HStack>
    </SafeAreaView>
  );
}
