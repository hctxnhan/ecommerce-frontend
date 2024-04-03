interface AsyncActionProps<T> {
  asyncFn: () => Promise<T>;
  options: {
    onSuccess?: (res: NonNullable<T>) => void;
    onError?: (error: any) => void;
  };
}

export function asyncAction<T>(
  asyncFn: () => Promise<T>,
  { onSuccess, onError }: AsyncActionProps<T>['options']
) {
  const res = async () => {
    try {
      const res = await asyncFn();
      onSuccess?.(res as NonNullable<T>);
      return res;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  };

  return res as () => Promise<T>;
}
