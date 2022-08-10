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
}

export default function ObserveContent ({
  children,
  observerOptions: definedObserverOptions
}: Props): JSX.Element {
  const ref = useRef(null)

  const [observing, setObserving] = useState(false)

  // @ts-expect-error
  const deferredObserving = useDeferredValue(observing, {
    timeoutMs: 50
  })

  const debouncedObserving = useDebounce(observing, 300)

  const observerOptions = {
    root: null,
    rootMargin: ' -17% 0px -45% 0px',
    threshold: 0.5
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
