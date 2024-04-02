import {
  Toast as OriginalToast,
  useToast as useToastOriginal
} from '@/components';
import { Toast } from '@/components/__custom__/Toast';
import { ComponentProps, useCallback } from 'react';

export function useToast() {
  const { show: showOriginal, close: closeOriginal } = useToastOriginal();

  const show = useCallback(({
    type = 'success',
    title,
    description
  }: {
    type?: ComponentProps<typeof OriginalToast>['action'];
    title: string;
    description: string;
  }) => {
    showOriginal({
      placement: 'top',
      render: ({ id }) => (
        <Toast
          toastId={id}
          title={title}
          description={description}
          action={type}
        />
      )
    });
  }, [showOriginal]);

  return {
    show,
    close: closeOriginal
  };
}
