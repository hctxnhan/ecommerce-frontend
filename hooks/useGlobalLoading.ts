import { useIsFetching, useIsMutating, QueryStatus } from '@tanstack/react-query'
import { useDebounce } from './useDebounce'

export function useGlobalLoading(delay = 200) {
  const isReactQueryLoading = useIsFetching()
  const isReactQueryMutate = useIsMutating()
  const isLoading =
     isReactQueryLoading > 0 || isReactQueryMutate > 0

  const isLoadingDebounced = useDebounce(isLoading, delay)

  return delay ? isLoadingDebounced : isLoading
}