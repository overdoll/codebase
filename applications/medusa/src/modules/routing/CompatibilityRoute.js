/**
 * @flow
 */
import { useHistory, useLocation } from '@//:modules/routing'
import type { BrowserHistory, BrowserLocation } from 'history'

type Props = {
  children: ({ history: BrowserHistory, location: BrowserLocation }),
};

/**
 * Compatibility Route
 *
 * Exports the router's history && location since some libraries will use this
 *
 * @param children
 * @returns {*}
 * @constructor
 */
export default function CompatibilityRoute ({ children }: Props): Node {
  const history = useHistory()
  const location = useLocation()

  return children({ history, location })
}
