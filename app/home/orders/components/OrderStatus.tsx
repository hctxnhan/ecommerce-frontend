import { Icon, Text } from '@/components';
import { Stepper, StepperStep } from '@/components/__custom__/Stepper';
import { OrderStatus as OrderStatusEnum } from '@/types';
import { Ban, CheckCircle, LucideClock8, TruckIcon } from 'lucide-react-native';

const steps = [
  {
    status: OrderStatusEnum.PENDING,
    title: 'Order places',
    icon: LucideClock8
  },
  {
    status: OrderStatusEnum.PROCESSING,
    title: 'Order shipped',
    icon: TruckIcon
  },
  {
    status: OrderStatusEnum.CANCELLED,
    title: 'Order delivered',
    icon: Ban
  },
  {
    status: OrderStatusEnum.COMPLETED,
    title: 'Order completed',
    icon: CheckCircle
  }
];

interface OrderStatusProps {
  status: OrderStatusEnum;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const currentStep = steps.findIndex((step) => step.status === status) + 1;
  
  return (
    <Stepper currentStep={currentStep} totalSteps={steps.length}>
      <Text>Orders</Text>
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
