import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from '@/utils/env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${environment.APP.baseUrl}:${environment.APP.port}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);