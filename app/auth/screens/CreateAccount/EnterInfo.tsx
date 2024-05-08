import {
  AlertCircleIcon,
  ArrowRightIcon,
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
  Input,
  InputField,
  InputIcon,
  InputSlot,
  LockIcon,
  SafeAreaView,
  ScrollView,
  Text,
  VStack
} from '@/components';

import { ButtonIcon } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export function EnterInfo() {
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
            <FormControl
              
              size={'lg'}
              isDisabled={false}
            >
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
            <FormControl
              
              size={'lg'}
              isDisabled={false}
            >
              <FormControlLabel>
                <FormControlLabelText>Full name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputSlot pl="$4">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField placeholder="Enter your full name" />
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
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputSlot pl="$4">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField type="password" placeholder="Enter your password" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Must be atleast 6 characters.
                </FormControlHelperText>
              </FormControlHelper>

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
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputSlot pl="$4">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  type="password"
                  placeholder="Confirm your password"
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
          <Button variant="solid">
            <ButtonText>Create Account</ButtonText>
            <ButtonIcon as={ArrowRightIcon} />
          </Button>

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