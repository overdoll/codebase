import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { Disposable } from 'react-relay/hooks'
import { useEffect, useState, useTransition } from 'react'
import { DisposeFn } from 'relay-runtime/lib/util/RelayRuntimeTypes'

interface Props {
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
}

interface ReturnProps {
  hasError: boolean
  onLoadNext: () => void
  isPending: boolean
}

export default function usePaginationScroller (props: Props): ReturnProps {
  const {
    loadNext,
    isLoadingNext
  } = props

  const [hasError, setHasError] = useState(false)
  const [dispose, setDispose] = useState<DisposeFn | null>(null)
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 300
  })

  const onLoadNext = (): void => {
    setHasError(false)
    const disposedLoad = (): Disposable => {
      return loadNext(8, {
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
  }

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