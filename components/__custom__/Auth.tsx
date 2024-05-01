import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useProfile } from '@/hooks/useProfile';
import { UserRole } from '@/types';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { ReactNode } from 'react';

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

export function IfRole({
  children,
  is: role,
  isNot: notRole
}: {
  children: ReactNode;
  is?: UserRole | UserRole[];
  isNot?: UserRole | UserRole[];
}) {
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return null;
  }

  const roles = Array.isArray(role) ? role : [role];
  const notRoles = Array.isArray(notRole) ? notRole : [notRole];

  if (!roles.includes(profile.role) || notRoles.includes(profile.role)) {
    return null;
  }

  return children;
}

interface RedirectRoleHomeProps {
  role?: UserRole | UserRole[];
  children: ReactNode;
}

const mapRoleToPath: Record<
  UserRole,
  '/' | '/home/shopOwner/' | '/home/admin/'
> = {
  [UserRole.USER]: '/',
  [UserRole.SHOP_OWNER]: '/home/shopOwner/',
  [UserRole.ADMIN]: '/home/admin/'
};

export function RedirectRoleHome(props: RedirectRoleHomeProps) {
  const { profile, isLoading } = useProfile();

  console.log(profile, isLoading, props.role)

  if (isLoading || !profile) {
    return null;
  }

  const roles = Array.isArray(props.role) ? props.role : [props.role];

  if (!roles.includes(profile.role)) {
    return <Redirect href={mapRoleToPath[profile.role]} />;
  }

  return props.children;
}
