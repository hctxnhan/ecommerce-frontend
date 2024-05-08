import {
  ArrowRightIcon,
  AtSignIcon,
  Box,
  Button,
  ButtonText,
  LockIcon,
  SafeAreaView,
  ScrollView,
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
import { UserIcon } from 'lucide-react-native';
import { FormValues } from '../../CreateAccount';

export function EnterInfo() {
  const { form } = useMultiStepForm();

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <Box p={'$6'}>
          <Text size="3xl" mb={'$2'} fontWeight="$bold">
            Create Account
          </Text>
          <Text>
            Start shopping with us and get exclusive deals and discounts.
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

            <FormInput
              name="name"
              label="Full name"
              placeholder="Enter your full name"
              control={form.control}
              errorMessage={form.formState.errors.name?.message as string}
              isDisabled={false}
              inputIcon={UserIcon}
            />

            <FormInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              control={form.control}
              errorMessage={form.formState.errors.password?.message as string}
              isDisabled={false}
              inputIcon={LockIcon}
              type="password"
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              control={form.control}
              errorMessage={
                form.formState.errors.confirmPassword?.message as string
              }
              isDisabled={false}
              inputIcon={LockIcon}
              type="password"
            />
          </VStack>

          <FormNextTrigger>
            <ButtonText>Create Account</ButtonText>
            <ButtonIcon as={ArrowRightIcon} />
          </FormNextTrigger>

          <Text
            mt={'$20'}
            textAlign="center"
            color="$blueGray500"
            fontWeight="$medium"
          >
            Already registered?{' '}
            <Link replace href={'/auth/Login'}>
              <Text color="$primary500" fontWeight="$bold">
                Login{' '}
              </Text>
            </Link>
          </Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
