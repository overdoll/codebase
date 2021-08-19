/**
 * @flow
 */

import RoutingContext from '@//:modules/routing/RoutingContext'
import type { Node } from 'react'
import { useContext } from 'react'
import { matchPath } from 'react-router'
import Link from './Link'
import { createLocation } from 'history'
import getBasePath from '@//:modules/content/Navigation/helpers/getBasePath'
import { useLocation } from '@//:modules/routing/useLocation'

type Props = {
  children: Node,
  to: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
  isActiveProp?: (string, string) => boolean,
}

const resolveToLocation = (to, currentLocation) =>
  typeof to === 'function' ? to(currentLocation) : to

const normalizeToLocation = (to, currentLocation) => {
  return typeof to === 'string'
    ? createLocation(to, null, null, currentLocation)
    : to
}

// implementation taken from https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js
// modified to work with our version of link (preloading, etc...)
// as well as changing the link to use an isActive children prop since we use css-in-js and not classnames
const NavLink = ({ children, to, exact = false, strict = false, sensitive = false, isActiveProp = null, ...rest }: Props): Node => {
  const router = useContext(RoutingContext)

  const location = useLocation()

  const currentLocation = router.history.location
  const toLocation = normalizeToLocation(
    resolveToLocation(to, currentLocation),
    currentLocation
  )

  const { pathname: path } = toLocation

  const escapedPath =
    path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  const isActiveBasePath = getBasePath(location.pathname) === getBasePath(path)

  const match = escapedPath
    ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact,
      sensitive,
      strict
    })
    : null

  const isActive = !!(isActiveProp
    ? isActiveProp(match, currentLocation)
    : match)

  return (
    <Link {...rest} to={to}>
      {children({ isActive, isActiveBasePath })}
    </Link>
  )
}

export default NavLink
