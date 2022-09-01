import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useDebounce } from 'usehooks-ts'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../../../../../support/runIfFunction'

export interface ObserveContentCallable {
  isObservingDebounced: boolean
  isObserving: boolean
}

interface Props {
  children: MaybeRenderProp<ObserveContentCallable>
  observerOptions?: IntersectionObserverInit
  height?: number
  width?: number
  debounceDelay?: number
  threshold?: number
}

export default function ObserveContent (props: Props): JSX.Element {
  const {
    children,
    observerOptions: definedObserverOptions,
    height,
    width,
    debounceDelay = 300,
    threshold
  } = props

  const ref = useRef(null)

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

  return (
    <Box w='100%' h='100%' ref={ref}>
      {runIfFunction(children, {
        isObserving: deferredObserving,
        isObservingDebounced: debouncedObserving
      })}
    </Box>
  )
}
