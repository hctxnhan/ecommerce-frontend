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

export const authApi = {
  login: (data: LoginBody) =>
    axiosInstance.post<APIResponse<LoginResponse>>('/auth/sign-in', data),
  logout: () =>
    Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken')
    ])
};
