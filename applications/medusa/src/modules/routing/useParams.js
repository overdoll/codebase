/**
 * @flow
 */

import { useRoutingContext } from './RoutingContext'
import type { RouterHistory } from '@//:modules/routing/router'

export const useParams = (): RouterHistory => {
  const context = useRoutingContext()
  return context.get().entries[context.get().entries.length - 1].routeData.params
}
