import {
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
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
      // $active={{
      //   _text: {
      //     color: '$primary500'
      //   },
      //   _icon: {
      //     fill: '$primary500'
      //   }
      // }}
      // $disabled={{
      //   _text: {
      //     color: '$white'
      //   }
      // }}
    >
      <ButtonIcon as={icon} size="xl" />
      <ButtonText ml={'$3'} fontWeight="$medium" size="lg" flex={1}>
        {title}
      </ButtonText>
    </Button>
  );
}

export default function Tab2() {
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
          rounded={'$lg'}
          borderColor="$borderLight200"
          alignItems="center"
          gap="$2"
        >
          <Avatar size="lg">
            <AvatarFallbackText>JD</AvatarFallbackText>
          </Avatar>
          <VStack flex={1} gap={'$2'}>
            <Text fontWeight={'bold'}>John Doe</Text>
            <Text>@1234lkhjjhsadf8</Text>
          </VStack>
          <Button variant="link">
            <ButtonIcon as={EditIcon} size="xl" />
          </Button>
        </HStack>
      </Container>
      <Container x>
        <ProfileLink
          onPress={() => {
            router.push('/home/orders');
          }}
          title="My orders"
          icon={ShoppingBagIcon}
        />
        <ProfileLink disabled title="Notifications" icon={BellIcon} />
        <ProfileLink disabled title="My address" icon={LocateIcon} />
        <ProfileLink title="Log out" icon={LogOut} />
      </Container>
    </SafeAreaView>
  );
}
