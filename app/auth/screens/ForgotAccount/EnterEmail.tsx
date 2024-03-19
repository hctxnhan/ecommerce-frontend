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
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import React from 'react';

import { ButtonIcon } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { FormNextTrigger } from '@/components/__custom__/Form';

export function EnterEmail() {
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
          <FormControl
            
            size={'lg'}
            isDisabled={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$4">
                <InputIcon as={AtSignIcon} />
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
