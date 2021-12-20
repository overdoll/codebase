import matchPath from './matchPath'
import { Match, Route, RouteMatch } from './router'

// taken from https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router-config/modules/matchRoutes.js

const computeRootMatch = (pathname: string): Match => {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  }
}

const matchRoutes = (routes: Route[], pathname, branch: RouteMatch[] = []): RouteMatch[] => {
  routes.some(route => {
    const match = route.path != null
      ? matchPath(pathname, route)
      : (branch.length > 0)
          ? branch[branch.length - 1].match // use parent match
          : computeRootMatch(pathname) // use default "root" match

    if (match != null) {
      branch.push({
        route,
        match
      })

      if (route.routes != null) {
        matchRoutes(route.routes, pathname, branch)
      }
    }

    return match
  })

  return branch
}

export default matchRoutes
