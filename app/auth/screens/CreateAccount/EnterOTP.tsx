import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  SafeAreaView,
  Text
} from '@/components';
import {
  FormNextTrigger,
  useMultiStepForm
} from '@/components/__custom__/Form';
import { OTPInput } from '@/components/__custom__/OTPInput';
import { Controller } from 'react-hook-form';

interface EnterOTPProps {
  onResend: () => void;
}

export function EnterOTP({ onResend }: EnterOTPProps) {
  const { form } = useMultiStepForm();

  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Center mb={'$16'}>
          <Text>An 6 digit OTP has been sent to.</Text>
          <Text color="$primary500">hctxnhan@gmail.com</Text>
        </Center>

        <Controller
          name="verificationCode"
          control={form.control}
          render={({ field: { onBlur, onChange } }) => (
            <OTPInput
              codeLength={6}
              onCodeFilled={(code) => {
                onChange(code);
                onBlur();
              }}
            />
          )}
        />
        <HStack mt={'$16'} gap={'$4'}>
          <Button flex={1} variant="outline" onPress={onResend}>
            <ButtonText textAlign="center">Resend</ButtonText>
          </Button>
          <FormNextTrigger flex={1} variant="solid">
            <ButtonText textAlign="center">Verify</ButtonText>
          </FormNextTrigger>
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
