/**
 * @flow
 */

import { useRoutingContext } from './RoutingContext';
import type { RouterHistory } from '@//:modules/routing/router';

export const useHistory = (): RouterHistory => {
  return useRoutingContext().history
}
