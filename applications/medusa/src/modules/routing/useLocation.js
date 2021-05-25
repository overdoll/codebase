/**
 * @flow
 */

import { useHistory } from '@//:modules/routing/useHistory'
import type { Location } from '@//:modules/routing/router'

export const useLocation = (): Location => {
  return useHistory().location
}
