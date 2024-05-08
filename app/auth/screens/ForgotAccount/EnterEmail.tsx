import {
  ArrowRightIcon,
  AtSignIcon,
  Box,
  ButtonText,
  SafeAreaView,
  Text,
  VStack
} from '@/components';

import {
  FormNextTrigger,
  useMultiStepForm
} from '@/components/__custom__/Form';
import { FormInput } from '@/components/__custom__/FormInput';
import { ButtonIcon } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export function EnterEmail() {
  const { form } = useMultiStepForm();

  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Text size="3xl" mb={'$2'} fontWeight="$bold">
          Forgot Password
        </Text>
        <Text>
          Don't worry! Just enter your email associated with your account.
        </Text>
        <VStack my={'$12'} gap={'$8'}>
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            control={form.control}
            errorMessage={form.formState.errors.email?.message as string}
            isDisabled={false}
            inputIcon={AtSignIcon}
          />
        </VStack>
        <FormNextTrigger>
          <ButtonText>Send code</ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </FormNextTrigger>

        <Text
          mt={'$20'}
          textAlign="center"
          color="$blueGray500"
          fontWeight="$medium"
        >
          Not in our system?{' '}
          <Link replace href={'/auth/CreateAccount'}>
            <Text color="$primary500" fontWeight="$bold">
              Create account{' '}
            </Text>
          </Link>
        </Text>
      </Box>
    </SafeAreaView>
  );
}
