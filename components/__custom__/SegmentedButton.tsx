import React, { useState, ReactElement, useRef, RefObject } from 'react';
import { Button, ButtonText } from '../button';
import { HStack } from '../hstack';
import { ScrollView } from '../scroll-view';
import { ScrollView as RNScrollView } from 'react-native';

interface SegmentedButtonProps {
  children:
    | ReactElement<SegmentedButtonButtonProps>
    | ReactElement<SegmentedButtonButtonProps>[];
  value?: string;
  onChange?: (value: string) => void;
}

interface SegmentedButtonButtonProps {
  value: string;
  index?: number;
  children: React.ReactNode;
  isSelected?: boolean;
  total?: number;
  onPress?: (value: string) => void;
}

export function SegmentedButtonGroup({
  children,
  onChange,
  value,
}: SegmentedButtonProps) {
  return (
    <HStack overflow="hidden" rounded={'$3xl'} bg="$backgroundLight200">
      <ScrollView w={'$full'} horizontal showsHorizontalScrollIndicator={false}>
        {React.Children.map(children, (child, index) => {
          if (child.type !== SegmentedButton) {
            return null;
          }

          return React.cloneElement(child, {
            isSelected: child.props.value === value,
            onPress: onChange,
            index,
            total: React.Children.count(children)
          });
        })}
      </ScrollView>
    </HStack>
  );
}

export function SegmentedButton({
  value,
  onPress,
  index,
  isSelected,
  total = 1,
  children
}: SegmentedButtonButtonProps) {
  return (
    <Button
      bg={isSelected ? '$primary500' : 'transparent'}
      size="lg"
      variant="solid"
      rounded={'$3xl'}
      onPress={() => onPress?.(value)}
    >
      <ButtonText
        textAlign="center"
        size="md"
        color={isSelected ? '$text100' : '$text400'}
      >
        {children}
      </ButtonText>
    </Button>
  );
}
