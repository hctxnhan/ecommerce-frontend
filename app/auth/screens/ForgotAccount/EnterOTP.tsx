import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  HStack,
  LoaderIcon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import { FormNextTrigger } from '@/components/__custom__/Form';
import { OTPInput } from '@/components/__custom__/OTPInput';

export function EnterOTP() {
  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Center mb={'$16'}>
          <Text>An 6 digit OTP has been sent to.</Text>
          <Text color="$primary500">hctxnhan@gmail.com</Text>
        </Center>

        <OTPInput
          codeLength={6}
          onCodeFilled={(code) => {
            console.log('Code Filled', code);
          }}
        />

        <HStack mt={'$16'} gap={'$4'}>
          <Button flex={1} variant="outline">
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
