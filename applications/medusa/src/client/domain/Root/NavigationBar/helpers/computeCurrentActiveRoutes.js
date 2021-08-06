/**
 * @flow
 */

import routes from '../routing/navigation'

export default function computeCurrentActiveRoutes ({ environment }) {
  const activeRoutes = routes

  // Determine if route is valid by calling the middleware function in the route
  const isRouteValid = (data, route) => {
    if (Object.prototype.hasOwnProperty.call(route, 'middleware')) {
      for (let i = 0; i < route.middleware.length; i++) {
        if (!route.middleware[i](data)) return false
      }
    }
    return true
  }

  // Function for omitting a key from an object
  const omitKeyFromObject = (key, object) => {
    const { [key]: omit, ...rest } = object
    return rest
  }

  // Recursively parse Middleware routes to make sure the user can actually access them
  const validRoutes = (routes) => {
    const parsed = []

    routes?.forEach((route) => {
      const isValid = isRouteValid({ environment }, route)

      if (isValid) {
        parsed.push({
          ...omitKeyFromObject('middleware', route),
          routes: validRoutes(route?.routes)
        })
      }
    })
    return parsed
  }

  // Filter for all disabled routes
  const navigationDisabled = (routes) => {
    const disabled = routes.filter((item) => item.hidden)
    return disabled.map((item) => { return item.path }
    )
  }

  // Recursively parse and flatten anything with a { navigation { key } }
  const flattenNavigationKey = (routes, key) => {
    let parsed = []

    for (const route of routes) {
      if (route?.navigation[key]) {
        parsed.push({
          path: route.path,
          ...(route.exact && { exact: route.exact }),
          navigation: route.navigation[key]
        })
      }
      if (route.routes) {
        parsed = parsed.concat(flattenNavigationKey(route.routes, key))
      }
    }
    return parsed
  }

  // Slightly modified version of above function to allow for labelled groupings
  const flattenSidebar = (routes, key) => {
    const parsed = []
    for (const route of routes) {
      if (route.navigation[key]) {
        parsed.push({
          path: route.path,
          ...(route.exact && { exact: route.exact }),
          navigation: route.navigation[key],
          routes: flattenNavigationKey(route.routes, key)
        })
      }
    }
    return parsed
  }

  const activeValidRoutes = validRoutes(activeRoutes)

  const navigationMenuRoutes = flattenNavigationKey(activeValidRoutes, 'menu')

  const navigationTopRoutes = flattenNavigationKey(activeValidRoutes, 'top')

  const navigationSidebarRoutes = flattenSidebar(activeValidRoutes, 'side')

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

  return [navRoutes(activeRoutes), navigationDisabled(activeRoutes)]
}
