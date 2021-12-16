import { createContext, useContext } from 'react'
import type { Router } from './router'

const RoutingContext = createContext<Router | undefined>(undefined)

/**
 * A custom context instance for our router type
 */
export default RoutingContext

export const useRoutingContext = (): Router => {
  const context = useContext(RoutingContext)

  if (context === undefined) {
    throw new Error('useRoutingContext must be used within a RoutingContext')
  }

  return context
}
