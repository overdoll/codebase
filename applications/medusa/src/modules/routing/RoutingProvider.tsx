import RoutingContext from './RoutingContext'
import { ReactNode } from 'react'
import { Router } from './router'
import { LocationProvider } from './Location'

interface Props {
  children: ReactNode
  router: Router
}

export default function RoutingProvider ({
  children,
  router
}: Props): JSX.Element {
  return (
    <RoutingContext.Provider value={router}>
      <LocationProvider>
        {children}
      </LocationProvider>
    </RoutingContext.Provider>
  )
}
