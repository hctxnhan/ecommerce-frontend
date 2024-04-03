import { ComponentProps } from 'react';
import { Box } from '../box';
import { DimensionValue } from 'react-native';

interface ContainerProps extends ComponentProps<typeof Box> {
  x?: boolean;
  y?: boolean;
  pLeft?: boolean;
  pRight?: boolean;
  pTop?: boolean;
  pBottom?: boolean;
}

export function Container({
  px = '$6',
  py = '$4',
  x = false,
  y = false,
  pLeft = false,
  pRight = false,
  pTop = false,
  pBottom = false,
  ...rest
}: ContainerProps) {
  const calculatedP = {} as Record<string, typeof px>;

  if (x) {
    calculatedP['px'] = px;
  }

  if (y) {
    calculatedP['py'] = py;
  }

  if (pLeft) {
    calculatedP['pl'] = px;
  }

  if (pRight) {
    calculatedP['pr'] = px;
  }

  if (pTop) {
    calculatedP['pt'] = py;
  }

  if (pBottom) {
    calculatedP['pb'] = py;
  }

  return <Box {...calculatedP} {...rest} />;
}
