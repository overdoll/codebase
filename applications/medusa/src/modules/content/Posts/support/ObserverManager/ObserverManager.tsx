import { createContext, useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../../../../support/runIfFunction'
import CanUseDOM from '../../../../operations/CanUseDOM'

interface Context {
  isObserving: boolean
}

interface Props {
  children: MaybeRenderProp<Context>
}

const defaultValue = {
  isObserving: false
}

export const ObserverManagerContext = createContext<Context>(defaultValue)

export function ObserverManagerProvider ({ children }: Props): JSX.Element {
  const ref = useRef(null)

  const [observing, setObserving] = useState(false)

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }

  const observerCallback = (entries): void => {
    const [entry] = entries
    setObserving(entry.isIntersecting)
  }

  let observer: IntersectionObserver

  if (CanUseDOM) {
    observer = new IntersectionObserver(observerCallback, observerOptions)
  }

  useEffect(() => {
    if (ref.current == null) return
    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref])

  const contextValue = {
    isObserving: observing
  }

  return (
    <ObserverManagerContext.Provider value={contextValue}>
      <Box h='100%' ref={ref}>
        {runIfFunction(children, {
          isObserving: observing
        })}
      </Box>
    </ObserverManagerContext.Provider>
  )
}
