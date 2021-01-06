import { createContext, useContext } from 'react';

const RoutingContext = createContext(null);

/**
 * A custom context instance for our router type
 */
export default RoutingContext;

export const useRoutingContext = () => {
  return useContext(RoutingContext);
};
