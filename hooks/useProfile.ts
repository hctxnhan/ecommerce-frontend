import { profileApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const { data: profile, ...rest } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
    select: (data) => data.data.data
  });

  return {
    profile,
    ...rest
  };
}
