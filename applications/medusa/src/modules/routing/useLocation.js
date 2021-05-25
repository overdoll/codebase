/**
 * @flow
 */

import { useHistory } from '@//:modules/routing/useHistory'
import type { BrowserLocation } from 'history'

export const useLocation = (): BrowserLocation => {
  return useHistory().location
}
