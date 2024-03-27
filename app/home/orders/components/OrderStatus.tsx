import { Icon, Text } from '@/components';
import { Stepper, StepperStep } from '@/components/__custom__/Stepper';
import {
  Ban,
  CheckCircle,
  LucideClock8,
  Package,
  TruckIcon
} from 'lucide-react-native';

const steps = [
  {
    title: 'Order places',
    icon: LucideClock8
  },
  {
    title: 'Order confirmed',
    icon: Package
  },
  {
    title: 'Order shipped',
    icon: TruckIcon
  },
  {
    title: 'Order delivered',
    icon: Ban
  },
  {
    title: 'Order completed',
    icon: CheckCircle
  }
];

export function OrderStatus() {
  const currentStep = 5;

  return (
    <Stepper currentStep={currentStep} totalSteps={5}>
      <Text>Orders ss</Text>
      {steps.map((step, index) => (
        <StepperStep bgColor="$green600" key={index}>
          <Icon
            color={index < currentStep ? '$green600' : '$secondary300'}
            as={step.icon}
            size={'lg'}
          />
        </StepperStep>
      ))}
    </Stepper>
  );
}
