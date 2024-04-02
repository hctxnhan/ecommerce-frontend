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
  (config) => {
    const token = AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);