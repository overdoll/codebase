import { useRoutingContext } from './RoutingContext'
import matchPath from './matchPath'
import Link, { ChildrenCallableLink } from './Link'
import { createLocation } from 'history'
import { useLocation } from './Location'
import getBasePath from './getBasePath'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../support/runIfFunction'

interface ChildrenCallable extends ChildrenCallableLink {
  isActive: boolean
  isActiveBasePath: boolean
}

interface Props {
  children: MaybeRenderProp<ChildrenCallable>
  to: string
  exact?: boolean
  strict?: boolean
  sensitive?: boolean
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
  ...rest
}: Props): JSX.Element => {
  const router = useRoutingContext()

  const location = useLocation()

  const currentLocation = router.history.location
  const toLocation = normalizeToLocation(
    resolveToLocation(to, currentLocation),
    currentLocation
  )

  const { pathname: path } = toLocation

  const escapedPath = path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  const isActiveBasePath = getBasePath(location.pathname) === getBasePath(path)

  const match = escapedPath != null
    ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact,
      sensitive,
      strict
    })
    : null

  const isActive = match != null

  return (
    <Link
      {...rest}
      to={to}
    >
      {({ isPending }) => (
        runIfFunction(children, {
          isActive,
          isActiveBasePath,
          isPending
        })
      )}
    </Link>
  )
}

export default NavLink
