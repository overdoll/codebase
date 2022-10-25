import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { Disposable } from 'react-relay/hooks'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { DisposeFn } from 'relay-runtime/lib/util/RelayRuntimeTypes'

interface Props {
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  loadCount?: number
}

interface ReturnProps {
  hasError: boolean
  onLoadNext: () => void
  isPending: boolean
}

export default function usePaginationScroller (props: Props): ReturnProps {
  const {
    loadNext,
    isLoadingNext,
    loadCount = 8
  } = props

  const [hasError, setHasError] = useState(false)
  const [dispose, setDispose] = useState<DisposeFn | null>(null)
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 300
  })

  const onLoadNext = useCallback(() => {
    setHasError(false)
    const disposedLoad = (): Disposable => {
      return loadNext(loadCount, {
        onComplete: (error) => {
          if (error != null) {
            setHasError(true)
          }
        }
      })
    }

    // this might cause errors but its really necessary to prevent noticeable
    // lag that happens when loading more on mobile
    // gives a much smoother experience
    startTransition(() => {
      disposedLoad()
    })
    setDispose(disposedLoad().dispose)
  }, [loadNext, setDispose])

  // on unmount, we dispose of the query if it's loading data
  useEffect(() => {
    return () => {
      if (dispose != null && isLoadingNext) {
        dispose()
      }
    }
  }, [dispose, isLoadingNext])

  return {
    hasError,
    onLoadNext,
    isPending
  }
}
