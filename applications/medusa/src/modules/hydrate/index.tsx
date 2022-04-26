import { createContext, ReactNode, useContext, useEffect, useState, useTransition } from 'react'

interface Props {
  children: ReactNode
}

const HydrateContext = createContext<boolean>(false)

export function HydrateProvider ({
  children
}: Props): JSX.Element {
  const [isHydrated, setHydrated] = useState(false)

  const [, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      setHydrated(true)
    })
  }, [])

  return (
    <HydrateContext.Provider value={isHydrated}>
      {children}
    </HydrateContext.Provider>
  )
}

export function useHydrate (): boolean {
  const context = useContext(HydrateContext)

  if (context === undefined) {
    throw new Error('useHydrate must be used within a HydrateProvider')
  }

  return context
}
