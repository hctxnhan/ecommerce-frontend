import { Star } from 'lucide-react-native';
import { ComponentProps } from 'react';
import { HStack } from '../hstack';
import { Icon } from '../icon';
import { Text } from '../text';

interface RatingProps extends ComponentProps<typeof HStack> {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  total?: number;
}

export function Rating({
  rating,
  size = 'sm',
  total,
  ...rest
}: RatingProps) {
  return (
    <HStack gap="$1" alignItems="center" {...rest}>
      <Icon as={Star} size={size} color="$yellow500" />
      <Text ml="$0.5" size={size} color="$text400">
        {rating} {!!total && `(${total})`}
      </Text>
    </HStack>
  );
}
