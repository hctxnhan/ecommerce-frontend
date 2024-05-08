import { Form } from '@/components/__custom__/Form';
import { EnterEmail } from './screens/ForgotAccount/EnterEmail';
import { z } from 'zod';
import { EnterNewPassword } from './screens/ForgotAccount/EnterNewPassword';
import { EnterOTP } from './screens/ForgotAccount/EnterOTP';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api';
import { useRef } from 'react';
import { useToast } from '@/hooks/useToast';

const Schema = z
  .object({
    email: z.string().email(),
    verificationCode: z
      .string()
      .length(6)
      .regex(/^\d{6}$/),
    password: z.string().min(8),
    repeatPassword: z.string()
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  });

type FormValues = z.infer<typeof Schema>;

export default function ForgetAccount() {
  const toast = useToast();

  const sendCode = useMutation({
    mutationFn: authApi.sendResetPasswordCode,
    onSuccess: () => {
      toast.show({
        title: 'Verification code sent',
        description: 'A verification code has been sent to your email'
      });
    }
  });
  const resetPassword = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.show({
        title: 'Password reset successful',
        description: 'Your password has been reset successfully'
      });
    },
    onError: () => {
      toast.show({
        title: 'Password reset failed',
        description: 'An error occurred while resetting your password'
      });
    }
  });

  const emailRef = useRef<string>('');

  function handleSendCode(data: FormValues) {
    emailRef.current = data.email;
    return sendCode.mutate(data.email);
  }

  function handleResetPassword(data: FormValues) {
    return resetPassword.mutate({
      code: data.verificationCode,
      email: data.email,
      password: data.password
    });
  }

  return (
    <Form.Provider
      schema={Schema}
      defaultValues={{
        email: '',
        verificationCode: [],
        password: '',
        repeatPassword: ''
      }}
    >
      <Form.Screen validationFields={['email']} onNext={handleSendCode}>
        <EnterEmail />
      </Form.Screen>
      <Form.Screen validationFields={['verificationCode']}>
        <EnterOTP
          onResend={() =>
            handleSendCode({ email: emailRef.current } as FormValues)
          }
        />
      </Form.Screen>
      <Form.Screen
        validationFields={['password', 'repeatPassword']}
        onNext={handleResetPassword}
      >
        <EnterNewPassword />
      </Form.Screen>
    </Form.Provider>
  );
}
