import { ComponentProps } from 'react';
import { ToastDescription, ToastTitle, Toast as OriginalToast } from '../toast';
import { VStack } from '../vstack';

export function Toast({
  toastId,
  title,
  description,
  action
}: {
  toastId: string;
  title: string;
  description: string;
  action: ComponentProps<typeof OriginalToast>['action'];
}) {
  const id = 'toastId-' + toastId;
  return (
    <OriginalToast nativeID={id} variant="accent" action={action}>
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </OriginalToast>
  );
}
