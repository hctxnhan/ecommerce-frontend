import { Children, ReactElement, cloneElement, isValidElement } from 'react';
import { Box } from '../box';
import { HStack } from '../hstack';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  children?: React.ReactNode;
}

export function Stepper({ children, currentStep, totalSteps }: StepperProps) {
  const child = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === StepperStep
  );

  return (
    <HStack justifyContent="space-between">
      {child.map((child, index) =>
        cloneElement(child, {
          completed: index < currentStep,
          isLast: index === totalSteps - 1
        })
      )}
    </HStack>
  );
}

export function StepperStep({
  completed = false,
  children,
  bgColor = '$backgroundLight200',
  isLast = false
}: {
  completed?: boolean;
  children: React.ReactNode;
  bgColor?: string;
  isLast?: boolean;
}) {
  return (
    <HStack
      alignItems="center"
      flex={isLast ? undefined : 1}
      borderRadius={'$full'}
    >
      {children}
      {!isLast && (
        <Box
          mx="$1"
          bg={completed ? bgColor : '$backgroundLight200'}
          h={'$0.5'}
          flex={1}
        />
      )}
    </HStack>
  );
}
