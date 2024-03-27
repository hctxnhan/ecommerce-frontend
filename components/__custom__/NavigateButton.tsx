import { ChevronRight } from 'lucide-react-native';
import { Button } from '../button';
import { HStack } from '../hstack';
import { Text } from '../text';
import { Icon } from '../icon';

interface NavigateButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
}

export function NavigateButton({ onPress, children }: NavigateButtonProps) {
  return (
    <Button
      onPress={onPress}
      zIndex={100}
      size="sm"
      action="secondary"
      variant="link"
    >
      <HStack
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        gap={'$1'}
      >
        <Text color="$primary500" fontWeight="bold" size="md">
          {children}
        </Text>
        <Icon size="xl" as={ChevronRight} />
      </HStack>
    </Button>
  );
}
