import { StarIcon } from 'lucide-react-native';
import { Button, ButtonIcon } from '../button';
import { HStack } from '../hstack';
import { Icon } from '../icon';

interface RatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
}

export function RatingInput({ rating, onChange }: RatingInputProps) {
  const handleRatingChange = (newRating: number) => {
    onChange(newRating);
  };

  return (
    <HStack justifyContent='center' gap="$2">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarButton
          key={star}
          filled={star <= rating}
          onClick={() => handleRatingChange(star)}
        />
      ))}
    </HStack>
  );
}

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
}

function StarButton({ filled, onClick }: StarIconProps) {
  return (
    <Button
      variant="link"
      onPress={onClick}
      bgColor="transparent"
      height={'auto'}
    >
      <ButtonIcon as={StarIcon} size={'xl'} color={filled ? '$yellow500' : '$text500'} />
    </Button>
  );
}
