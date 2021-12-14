/**
 * @flow
 */

import { useRoutingContext } from './RoutingContext'
import { Params } from './router'

export const useParams = (): Params => {
  const context = useRoutingContext()
  return context.get().entries[context.get().entries.length - 1].routeData.params
}
