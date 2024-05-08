import { APIResponse } from './../types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from './axiosInstance';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface SignUpBody {
  email: string;
  password: string;
  name: string;
}

export const authApi = {
  login: (data: LoginBody) =>
    axiosInstance.post<APIResponse<LoginResponse>>('/auth/sign-in', data),
  logout: () =>
    Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken')
    ]),

  signUp: (data: SignUpBody) =>
    axiosInstance.post<APIResponse<unknown>>('/auth/sign-up', {
      ...data,
      confirmPassword: data.password
    }),
  verifySignUp: (data: { email: string; verificationCode: string }) =>
    axiosInstance.post<APIResponse<unknown>>(
      `/auth/verify-signup?email=${data.email}&code=${data.verificationCode}`
    ),
  resetPassword: (data: { email: string; code: string; password: string }) =>
    axiosInstance.post<APIResponse<unknown>>('/auth/reset-password', data),
  sendResetPasswordCode: (email: string) =>
    axiosInstance.post<APIResponse<unknown>>(
      `/auth/resend-verify-code?email=${email}&purpose=RESET_PASSWORD`
    )
};
