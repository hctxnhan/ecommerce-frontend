import { useProfile } from '@/hooks/useProfile';
import ShopId from '../shop/components/ShopId';

export default function Home() {
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) return null;

  return <ShopId shopId={profile._id} />;
}
