/**
 * @flow
 */
import type { Context } from 'react';
import { createContext, useContext } from 'react';
import type { Router } from './router';

const RoutingContext: Context<Router> = createContext({})

/**
 * A custom context instance for our router type
 */
export default RoutingContext

export const useRoutingContext = (): Router => {
  return useContext<Router>(RoutingContext)
}
