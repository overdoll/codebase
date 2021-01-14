import { useRoutingContext } from './RoutingContext';

export const useLocation = () => {
  return useRoutingContext().history.location;
};
