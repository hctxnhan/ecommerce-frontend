import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { getItem: getAccessToken } = useAsyncStorage('accessToken');
  const {
    data: accessToken,
    error,
    isLoading
  } = useAsyncAction(getAccessToken, {
    autoStart: true
  });

  if (isLoading) {
    return null;
  }

  if (!accessToken || error) {
    return <Redirect href="/auth/Login" />;
  }

  return children;
}

export function AuthRoute({ children }: { children: ReactNode }) {
  const { getItem: getAccessToken } = useAsyncStorage('accessToken');
  const {
    data: accessToken,
    error,
    isLoading
  } = useAsyncAction(getAccessToken, {
    autoStart: true
  });

  if (isLoading) {
    return null;
  }

  if (accessToken) {
    return <Redirect href="/" />;
  }

  return children;
}