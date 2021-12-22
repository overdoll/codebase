import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Location } from 'history'
import { useRoutingContext } from './RoutingContext'

const LocationContext = createContext<Location | undefined>(undefined)

export const useLocation = (): Location => {
  const context = useContext(LocationContext)

  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }

  return context
}

interface Props {
  children: ReactNode
}

export function LocationProvider ({ children }: Props): JSX.Element {
  const router = useRoutingContext()
  const [location, setLocation] = useState(router.history.location)

  useEffect(() => {
    // update location once history is updated
    router.history.listen(location => {
      setLocation(location)
    })
  }, [])

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}
