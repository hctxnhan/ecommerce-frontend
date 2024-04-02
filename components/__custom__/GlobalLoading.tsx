import { useGlobalLoading } from '@/hooks/useGlobalLoading';
import { Center } from '../center';
import { Spinner } from '../spinner';

export function GlobalLoading() {
  const isLoading = useGlobalLoading();

  return isLoading ? (
    <Center
      zIndex={1000}
      position={'absolute'}
      top={0}
      left={0}
      width={'100%'}
      height={'100%'}
      bgColor={'rgba(0, 0, 0, 0.5)'}
    >
      <Spinner size={'large'} />
    </Center>
  ) : null;
}
