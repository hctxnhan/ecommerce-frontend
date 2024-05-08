import { authApi } from '@/api/auth';
import {
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import { IfRole } from '@/components/__custom__/Auth';
import { Container } from '@/components/__custom__/Container';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/useToast';
import { UserRole } from '@/types';
import { router } from 'expo-router';
import {
  BellIcon,
  EditIcon,
  LocateIcon,
  LogOut,
  ShoppingBagIcon,
  User2Icon
} from 'lucide-react-native';

function ProfileLink({
  title,
  onPress,
  icon,
  disabled = false
}: {
  onPress?: () => void;
  disabled?: boolean;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <Button
      w="$full"
      variant="outline"
      px={'$0'}
      action="secondary"
      borderWidth={0}
      onPress={onPress}
      disabled={disabled}
      sx={{
        _icon: {
          props: {
            color: '$green600'
          }
        }
      }}
    >
      <ButtonIcon as={icon} size="xl" />
      <ButtonText ml={'$3'} fontWeight="$medium" size="lg" flex={1}>
        {title}
      </ButtonText>
    </Button>
  );
}

export default function Tab2() {
  const { start } = useAsyncAction(authApi.logout);
  const toast = useToast();
  const { profile } = useProfile();

  function handleLogout() {
    start(undefined, {
      onSuccess: () => {
        toast.show({
          title: 'Logged out successfully',
          type: 'success',
          description: 'You have successfully logged out'
        });

        router.push('/auth/Login');
      }
    });
  }

  return (
    <SafeAreaView flex={1}>
      <Container x y py={'$2'}>
        <HStack alignItems="center" gap={'$3'}>
          <Icon size={30} as={User2Icon} />
          <Text fontSize={'$2xl'} fontWeight={'bold'}>
            Profile
          </Text>
        </HStack>
      </Container>
      <Container x y>
        <HStack
          p="$3"
          borderWidth={1}
          rounded={'$3xl'}
          borderColor="$borderLight200"
          alignItems="center"
          gap="$2"
        >
          <Avatar size="lg">
            <AvatarFallbackText>{profile?.name}</AvatarFallbackText>
          </Avatar>
          <VStack flex={1} gap={'$2'}>
            <HStack alignItems="center" gap={'$1'}>
              <Text fontWeight={'bold'}>{profile?.name}</Text>
              <Badge>
                <BadgeText>{profile?.role}</BadgeText>
              </Badge>
            </HStack>
            <Text size="xs" color="$text400">
              {profile?.email}
            </Text>
          </VStack>
          <Button
            onPress={() => router.push('/home/profile/UpdateProfile')}
            variant="link"
          >
            <ButtonIcon as={EditIcon} size="xl" />
          </Button>
        </HStack>
      </Container>
      <Container x>
        <IfRole is={UserRole.USER}>
          <ProfileLink
            onPress={() => {
              router.push('/home/orders/');
            }}
            title="My orders"
            icon={ShoppingBagIcon}
          />
        </IfRole>
        <IfRole is={UserRole.USER}>
          <ProfileLink
            onPress={() => {
              router.push('/home/profile/SellerRegistration');
            }}
            title="Register as a seller"
            icon={ShoppingBagIcon}
          />
        </IfRole>
        <ProfileLink disabled title="Notifications" icon={BellIcon} />
        <IfRole is={UserRole.USER}>
          <ProfileLink
            onPress={() => {
              router.push('/home/profile/address');
            }}
            title="My address"
            icon={LocateIcon}
          />
        </IfRole>
        <ProfileLink title="Log out" onPress={handleLogout} icon={LogOut} />
      </Container>
    </SafeAreaView>
  );
}
