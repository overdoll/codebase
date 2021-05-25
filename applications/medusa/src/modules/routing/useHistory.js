/**
 * @flow
 */

import { useRoutingContext } from './RoutingContext'
import type { BrowserHistory } from 'history'

export const useHistory = (): BrowserHistory => {
  return useRoutingContext().history
}
