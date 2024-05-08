import { authApi } from '@/api';
import { Form } from '@/components/__custom__/Form';
import { useToast } from '@/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { z } from 'zod';
import { EnterInfo } from './screens/CreateAccount/EnterInfo';
import { EnterOTP } from './screens/CreateAccount/EnterOTP';

const Schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
    name: z.string().min(1).max(100),
    verificationCode: z.string().length(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type FormValues = z.infer<typeof Schema>;

export default function CreateAccount() {
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

  const verify = useMutation({
    mutationFn: authApi.verifySignUp,
    onSuccess: () => {
      toast.show({
        title: 'Sign up successful',
        description: 'Your account has been created successfully'
      });
    }
  });

  const signUp = useMutation({
    mutationFn: authApi.signUp,
    onError: () => {
      toast.show({
        title: 'Password reset failed',
        description: 'An error occurred while create your account'
      });
    }
  });

  const emailRef = useRef<string>('');

  // function handleSendCode(data: FormValues) {
  //   emailRef.current = data.email;
  //   return sendCode.mutate(data.email);
  // }

  function handleVerify(data: FormValues) {
    return verify.mutate({
      verificationCode: data.verificationCode,
      email: data.email
    });
  }

  function handleSignUp(data: FormValues) {
    return signUp.mutate({
      email: data.email,
      password: data.password,
      name: data.name
    });
  }

  return (
    <Form.Provider
      schema={Schema}
      defaultValues={{
        email: '',
        verificationCode: [],
        name: '',
        password: '',
        repeatPassword: ''
      }}
    >
      <Form.Screen
        validationFields={['email', 'password', 'repeatPassword', 'name']}
        onNext={handleSignUp}
      >
        <EnterInfo />
      </Form.Screen>
      <Form.Screen
        onNext={handleVerify}
        validationFields={['verificationCode']}
      >
        <EnterOTP onResend={() => {}} />
      </Form.Screen>
    </Form.Provider>
  );
}
