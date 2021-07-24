/**
 * @flow
 */

import routes from '../routing/navigation'

export default function computeCurrentActiveRoutes ({ environment }) {
  const activeRoutes = routes

  const isRouteValid = (data, route) => {
    if (Object.prototype.hasOwnProperty.call(route, 'middleware')) {
      for (let i = 0; i < route.middleware.length; i++) {
        if (!route.middleware[i](data)) return false
      }
    }
    return true
  }

  const navDisabled = (routes) => {
    const disabled = routes.filter((item) => item.hidden)
    return disabled.map((item) => { return item.path }
    )
  }

  const navRoutes = (routes) => {
    const navHeaders = []

    for (const route of routes) {
      const nav = {}

      const valid = isRouteValid({ environment }, route)

      if (route.navigation && valid) {
        Object.assign(nav, {
          route: route.path,
          ...(route.navigation.top?.title && { title: route.navigation.top.title }),
          ...(route.navigation.top?.icon && { icon: route.navigation.top.icon }),
          ...(route.navigation.firstRoute && { firstRoute: route.navigation.firstRoute }),
          ...(route.navigation.hidden && { hidden: route.navigation.hidden }),
          ...(route.exact && { exact: route.exact })
        })
        if (route.navigation?.side) {
          const parseRoutes = (childRoutes) => {
            const parsed = []

            for (const route of childRoutes) {
              const validChild = isRouteValid({ environment }, route.path)

              if (route.navigation.side && validChild) {
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

  return [navRoutes(activeRoutes), navDisabled(activeRoutes)]
}
