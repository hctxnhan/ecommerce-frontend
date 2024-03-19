import {
  AlertCircleIcon,
  ArrowRightIcon,
  AtSignIcon,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  LockIcon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import React from 'react';

import { ButtonIcon } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Text size="3xl" mb={'$2'} fontWeight="$bold">
          Login to your account
        </Text>
        <Text>See what is happening in the world right now.</Text>
        <VStack my={'$12'} gap={'$8'}>
          <FormControl size={'lg'} isDisabled={false}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField placeholder="Enter your email" />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl size={'lg'} isDisabled={false}>
            <FormControlLabel>
              <HStack width={'$full'} justifyContent="space-between">
                <FormControlLabelText>Password</FormControlLabelText>
                <Link href={'/auth/ForgetAccount'}>
                  <Text color="$primary500">Forgot password?</Text>
                </Link>
              </HStack>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField type="password" placeholder="Enter your password" />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>
        <Button variant="solid">
          <ButtonText>Login</ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </Button>

        <Text
          mt={'$20'}
          textAlign="center"
          color="$blueGray500"
          fontWeight="$medium"
        >
          Don't have an account?{' '}
          <Link replace href={'/auth/CreateAccount'}>
            <Text color="$primary500" fontWeight="$bold">
              Create account
            </Text>
          </Link>
          <Link replace href={'/home/'}>
            <Text color="$primary500" fontWeight="$bold">
              Go home
            </Text>
          </Link>
        </Text>
      </Box>
    </SafeAreaView>
  );
}
