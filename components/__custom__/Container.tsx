import { ComponentProps } from 'react';
import { Box } from '../box';

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
  const calculatedP = {
    px: x ? px : undefined,
    py: y ? py : undefined,
    pl: pLeft ? px : undefined,
    pr: pRight ? px : undefined,
    pt: pTop ? py : undefined,
    pb: pBottom ? py : undefined
  };

  return (
    <Box
      {...calculatedP}
      {...rest}
    />
  );
}
