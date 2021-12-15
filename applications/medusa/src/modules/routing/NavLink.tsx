import { useRoutingContext } from '@//:modules/routing/RoutingContext'
import { matchPath } from 'react-router'
import Link from './Link'
import { createLocation } from 'history'
import { useLocation } from '@//:modules/routing/useLocation'
import { ReactNode } from 'react'
import getBasePath from './getBasePath'

interface ChildrenCallable {
  isActive: boolean
  isActiveBasePath: boolean
}

interface Props {
  children: (ChildrenCallable: ChildrenCallable) => ReactNode
  to: string
  exact?: boolean
  strict?: boolean
  sensitive?: boolean
  isActiveProp?: ((t1: string, t2: any) => boolean)
}

const resolveToLocation = (to: any, currentLocation: any): string =>
  typeof to === 'function' ? to(currentLocation) : to

const normalizeToLocation = (to: any, currentLocation: any): Location => {
  return typeof to === 'string'
    ? createLocation(to, undefined, undefined, currentLocation)
    : to
}

// implementation taken from https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js
// modified to work with our version of link (preloading, etc...)
// as well as changing the link to use an isActive children prop since we use css-in-js and not classnames
const NavLink = ({
  children,
  to,
  exact = false,
  strict = false,
  sensitive = false,
  isActiveProp,
  ...rest
}: Props): JSX.Element | null => {
  const router = useRoutingContext()

  const location = useLocation()

  const currentLocation = router.history.location
  const toLocation = normalizeToLocation(
    resolveToLocation(to, currentLocation),
    currentLocation
  )

  const { pathname: path } = toLocation

  const escapedPath =
    (path !== '') && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  const isActiveBasePath = getBasePath(location.pathname) === getBasePath(path)

  const match = escapedPath != null
    ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact,
      sensitive,
      strict
    })
    : null

  let isActive

  if (isActiveProp != null) {
    isActive = isActiveProp(match, currentLocation)
  } else {
    isActive = match
  }

  if (children == null) {
    return null
  }

  return (
    <Link
      {...rest}
      to={to}
    >
      {children({
        isActive,
        isActiveBasePath
      })}
    </Link>
  )
}

export default NavLink
