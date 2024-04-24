import { Icon, Text } from '@/components';
import { Stepper, StepperStep } from '@/components/__custom__/Stepper';
import { OrderItemStatus, OrderStatus as OrderStatusEnum } from '@/types';
import { Ban, CheckCircle, LucideClock8, TruckIcon } from 'lucide-react-native';

export const orderSteps: Step[] = [
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

export const orderItemSteps: Step[] = [
  { status: OrderItemStatus.PENDING, title: 'Pending', icon: LucideClock8 },
  { status: OrderItemStatus.CONFIRMED, title: 'Confirmed', icon: CheckCircle },
  { status: OrderItemStatus.SHIPPING, title: 'Shipping', icon: TruckIcon },
  { status: OrderItemStatus.COMPLETED, title: 'Completed', icon: CheckCircle },
  { status: OrderItemStatus.CANCELLED, title: 'Cancelled', icon: Ban }
];

interface Step {
  status: OrderStatusEnum | OrderItemStatus;
  title: string;
  icon: any;
}

interface OrderStatusProps {
  status: OrderStatusEnum | OrderItemStatus;
  steps: Step[];
}

export function OrderStatus({ steps, status }: OrderStatusProps) {
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
