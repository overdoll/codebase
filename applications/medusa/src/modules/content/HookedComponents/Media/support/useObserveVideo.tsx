import { RefObject, useEffect, useRef, useState } from 'react'
import { Timeout } from '@//:types/components'

interface UseObserveVideoPropsReturn {
  ref: RefObject<HTMLDivElement>
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
    threshold
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<Timeout | null>(null)

  const [observing, setObserving] = useState(false)

  const setThreshold = threshold != null ? threshold : ((width == null || height == null) ? 0.45 : ((height / width) >= 1 ? 0.23 : 0.45))

  const observerOptions = {
    rootMargin: '-19% 0% -45% 0%',
    threshold: setThreshold
  }

  const observerCallback = (entries): void => {
    const [entry] = entries

    if (entry.isIntersecting === true) {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setObserving(true)
      }, 650)
    } else {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
      setObserving(false)
    }
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
    isObserving: observing
  }
}
