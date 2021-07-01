/**
 * @flow
 */

import routes from '../../../routes'

export default function computeCurrentActiveRoutes () {
  const activeRoutes = routes[0].routes

  const navRoutes = (routes) => {
    const navHeaders = []

    for (const route of routes) {
      const nav = {}
      if (route.navigation?.top) {
        Object.assign(nav, {
          route: route.path,
          title: route.navigation.top.title,
          icon: route.navigation.top.icon,
          ...(route.navigation.firstRoute && { firstRoute: route.navigation.firstRoute }),
          ...(route.navigation.hidden && { hidden: route.navigation.hidden }),
          ...(route.exact && { exact: route.exact })
        })
        if (route.navigation?.side) {
          const parseRoutes = (childRoutes) => {
            const parsed = []

            for (const route of childRoutes) {
              if (route.navigation.side) {
                parsed.push({
                  title: route.navigation.side.title,
                  route: route.path,
                  ...(route.navigation.side.icon && { icon: route.navigation.side.icon }),
                  ...(route.navigation.firstRoute && { firstRoute: route.navigation.firstRoute }),
                  ...(route.routes && { routes: parseRoutes(route.routes) })
                })
              }
            }
            return parsed
          }

          Object.assign(nav, {
            sidebar: {
              title: route.navigation.side.title,
              routes: parseRoutes(route.routes)
            }
          })
        }
      }
      if (Object.keys(nav).length > 0) {
        navHeaders.push(nav)
      }
    }
    return navHeaders
  }

  return navRoutes(activeRoutes)
}
