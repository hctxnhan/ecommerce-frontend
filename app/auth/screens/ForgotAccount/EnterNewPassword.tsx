import {
  AlertCircleIcon,
  ArrowRightIcon,
  Box,
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
  LockIcon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import React from 'react';

import { FormNextTrigger } from '@/components/__custom__/Form';
import { ButtonIcon } from '@gluestack-ui/themed';

export function EnterNewPassword() {
  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Text size="3xl" mb={'$2'} fontWeight="$bold">
          Enter new password
        </Text>
        <Text>
          Last step! Enter your new password and confirm it to reset your
          account
        </Text>
        <VStack my={'$12'} gap={'$8'}>
          <FormControl
            
            size={'lg'}
            isDisabled={false}
          >
            <FormControlLabel>
              <FormControlLabelText>New password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField placeholder="Enter your new password" />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            
            size={'lg'}
            isDisabled={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Confirm password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField
                type="password"
                placeholder="Re-enter your password"
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>
        <FormNextTrigger variant="solid">
          <ButtonText>Send code</ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </FormNextTrigger>
      </Box>
    </SafeAreaView>
  );
}
