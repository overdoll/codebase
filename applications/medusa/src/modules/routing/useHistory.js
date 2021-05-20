import { useRoutingContext } from './RoutingContext'

export const useHistory = () => {
  return useRoutingContext().history
}
