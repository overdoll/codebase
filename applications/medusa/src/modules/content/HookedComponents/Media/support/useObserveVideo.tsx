import { RefObject, useDeferredValue, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

interface UseObserveVideoPropsReturn {
  ref: RefObject<HTMLDivElement>
  isObservingDebounced: boolean
  isObserving: boolean
}

export interface UseObserveVideoProps {
  height?: number
  width?: number
  debounceDelay?: number
  threshold?: number
  observerOptions?: IntersectionObserverInit
}

export default function useObserveVideo (props: UseObserveVideoProps): UseObserveVideoPropsReturn {
  const {
    observerOptions: definedObserverOptions,
    height,
    width,
    debounceDelay = 300,
    threshold
  } = props

  const ref = useRef<HTMLDivElement>(null)

  const [observing, setObserving] = useState(false)

  // @ts-expect-error
  const deferredObserving = useDeferredValue(observing, {
    timeoutMs: 50
  })

  const debouncedObserving = useDebounce(observing, debounceDelay)

  const setThreshold = threshold != null ? threshold : ((width == null || height == null) ? 0.45 : ((height / width) >= 1 ? 0.23 : 0.45))

  const observerOptions = {
    rootMargin: '-19% 0% -45% 0%',
    threshold: setThreshold
  }

  const observerCallback = (entries): void => {
    const [entry] = entries
    setObserving(entry.isIntersecting)
  }

  useEffect(() => {
    if (ref.current == null) return

    const observer = new IntersectionObserver(observerCallback, definedObserverOptions ?? observerOptions)

    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref])

  return {
    ref,
    isObserving: deferredObserving,
    isObservingDebounced: debouncedObserving
  }
}
