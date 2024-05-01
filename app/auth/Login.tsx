import { authApi } from '@/api/auth';
import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonText,
  LockIcon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import { FormInput } from '@/components/__custom__/FormInput';
import { useToast } from '@/hooks/useToast';
import { ButtonIcon } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z.string({
    required_error: 'Password is required'
  })
});

export default function Login() {
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema)
  });

  const toast = useToast();

  const loginMutation = useMutation({
    mutationFn: authApi.login
  });

  const { setItem: setAccessToken } = useAsyncStorage('accessToken');
  const { setItem: setRefreshToken } = useAsyncStorage('refreshToken');

  function onSubmit(data: z.infer<typeof Schema>) {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAccessToken(data.data.data.accessToken);
        setRefreshToken(data.data.data.refreshToken);

        toast.show({
          type: 'success',
          title: 'Login successful',
          description: 'You have successfully logged in'
        });

        router.replace('/');
      },
      onError: (error: AxiosError) => {
        toast.show({
          type: 'error',
          title: 'Login failed',
          description: error.response?.data?.message
        });
      }
    });
  }

  return (
    <SafeAreaView flex={1}>
      <Box p={'$6'}>
        <Text size="3xl" mb={'$2'} fontWeight="$bold">
          Login to your account
        </Text>
        <Text>See what is happening in the world right now.</Text>
        <VStack my={'$12'} gap={'$8'}>
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            control={control}
            errorMessage={errors.email?.message as string}
            isDisabled={false}
            inputIcon={LockIcon}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            control={control}
            errorMessage={errors.password?.message as string}
            isDisabled={false}
            inputIcon={LockIcon}
            type="password"
          />
        </VStack>
        <Button onPress={handleSubmit(onSubmit)} variant="solid">
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
        </Text>
      </Box>
    </SafeAreaView>
  );
}
