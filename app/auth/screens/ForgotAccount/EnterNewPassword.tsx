import {
  ArrowRightIcon,
  Box,
  ButtonText,
  LockIcon,
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

export function EnterNewPassword() {
  const { form } = useMultiStepForm();

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
          <FormInput
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            control={form.control}
            errorMessage={form.formState.errors.password?.message as string}
            isDisabled={false}
            inputIcon={LockIcon}
            type='password'
          />
          <FormInput
            name="repeatPassword"
            label="Repeat Password"
            placeholder="Enter your password"
            control={form.control}
            errorMessage={
              form.formState.errors.repeatPassword?.message as string
            }
            isDisabled={false}
            inputIcon={LockIcon}
            type="password"
          />
        </VStack>
        <FormNextTrigger variant="solid">
          <ButtonText>Send code</ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </FormNextTrigger>
      </Box>
    </SafeAreaView>
  );
}
