import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from '../image';
import { Box } from '../box';
import { clampValue } from '@/utils/utils';
import { Ref, useRef, useState } from 'react';
import { ImageProps } from 'react-native';

interface ViewImageModalProps {
  onClose: () => void;
  image: string;
}

const IMAGE_SCALE = {
  MIN: 0,
  MAX: 3
};

export function ViewImageModal({ onClose, image }: ViewImageModalProps) {
  const pan = Gesture.Pan();
  const pinch = Gesture.Pinch().onChange(handlePinch);

  const [scale, setScale] = useState(1);

  const composedGesture = Gesture.Simultaneous(pan, pinch);

  function handlePinch(e) {
    // const clampScale = clampValue(
    //   e.scale * scale,
    //   IMAGE_SCALE.MIN,
    //   IMAGE_SCALE.MAX
    // );

    // setScale(clampScale);
  }

  function handlePan(e) {}

  function handleGesture() {}

  return (
    <GestureDetector gesture={composedGesture}>
      <Box w={'$full'} flex={1}>
        <Image
          source={{ uri: image }}
          w={'$full'}
          h={'$full'}
          objectFit="cover"
          transform={[{ scale }]}
        />
      </Box>
    </GestureDetector>
  );
}
