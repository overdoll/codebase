import matchPath from './matchPath'

// taken from https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router-config/modules/matchRoutes.js

function computeRootMatch (pathname) {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  }
}

function matchRoutes (routes, pathname, branch = []) {
  routes.some(route => {
    const match = route.path
      ? matchPath(pathname, route)
      : (branch.length > 0)
          ? branch[branch.length - 1].match // use parent match
          : computeRootMatch(pathname) // use default "root" match

    if (match) {
      branch.push({
        route,
        match
      })

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch)
      }
    }

    return match
  })

  return branch
}

export default matchRoutes
