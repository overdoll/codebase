import { useRoutingContext } from './RoutingContext'
import { History } from 'history'

export const useHistory = (): History => {
  return useRoutingContext().history
}
