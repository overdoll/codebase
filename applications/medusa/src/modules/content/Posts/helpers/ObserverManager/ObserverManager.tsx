import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

interface Context {
  isObserving: boolean
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

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  useEffect(() => {
    if (ref.current == null) return
    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref, observer])

  const contextValue = {
    isObserving: observing
  }

  return (
    <ObserverManagerContext.Provider value={contextValue}>
      <Box h='100%' ref={ref}>
        {children}
      </Box>
    </ObserverManagerContext.Provider>
  )
}
