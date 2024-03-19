import {
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonIcon,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { ChevronRight, EditIcon, User2Icon } from 'lucide-react-native';

function ProfileLink({
  title,
  icon,
  disabled = false
}: {
  disabled?: boolean;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <HStack
      borderColor="$borderLight200"
      w="$full"
      gap="$3"
      alignItems="center"
    >
      <Button bgColor="$backgroundLight100" size="xs" aspectRatio={1}>
        <ButtonIcon as={icon} size="lg" color="$secondary600" />
      </Button>
      <Text
        color={disabled ? '$textLight400' : '$text800'}
        fontWeight="$medium"
        flex={1}
      >
        {title}
      </Text>
      <Button variant="link">
        <ButtonIcon
          as={ChevronRight}
          size="lg"
          color={disabled ? '$textLight400' : '$text800'}
        />
      </Button>
    </HStack>
  );
}

export default function Tab2() {
  return (
    <SafeAreaView flex={1}>
      <Container x y>
        <HStack alignItems="center" gap={'$3'}>
          <Icon size={30} as={User2Icon} />
          <Text fontSize={'$2xl'} fontWeight={'bold'}>
            Profile
          </Text>
        </HStack>
      </Container>
      <Container x y>
        <HStack alignItems="center" gap="$2">
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
        <ProfileLink title="My orders" icon={EditIcon} />
        <ProfileLink title="Notifications" icon={EditIcon} />
        <ProfileLink title="My address" icon={EditIcon} />
        <ProfileLink title="Log out" icon={EditIcon} />
      </Container>
    </SafeAreaView>
  );
}
