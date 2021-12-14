import importedRoutes from '../routing/navigation'

// Determine if route is valid by calling the middleware function in the route
const isRouteValid = (data, route): boolean => {
  if (Object.prototype.hasOwnProperty.call(route, 'middleware') as boolean) {
    for (let i = 0; i < route.middleware.length; i++) {
      if (!route.middleware[i](data)) return false
    }
  }
  return true
}

// Group objects by a dynamic key value
const groupByKey = (object, key) => {
  return object.reduce((accumulator, currentValue) => {
    accumulator[currentValue.navigation[key]] = accumulator[currentValue.navigation[key]] || []
    accumulator[currentValue.navigation[key]].push(currentValue)
    return accumulator
  }, {})
}

// Function for omitting a key from an object
const omitKeyFromObject = (key, object) => {
  const {
    [key]: omit,
    ...rest
  } = object
  return rest
}

export default function computeCurrentActiveRoutes ({ environment }) {
  const activeRoutes = importedRoutes

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
    return disabled.map((item) => {
      return item.path
    }
    )
  }

  // Recursively parse and flatten anything with a { navigation { key } }
  const flattenNavigationKey = (routes, key) => {
    let parsed = []

    for (const route of routes) {
      if (route?.navigation?.[key]) {
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
      if (route.navigation?.[key]) {
        const subRoutes = flattenNavigationKey(route.routes, key)

        const reduced = groupByKey(subRoutes, 'grouping')

        parsed.push({
          path: route.path,
          ...(route.exact && { exact: route.exact }),
          navigation: route.navigation[key],
          routes: reduced
        })
      }
    }
    return parsed
  }

  const activeValidRoutes = validRoutes(activeRoutes)

  const navigationMenuRoutes = flattenNavigationKey(activeValidRoutes, 'menu')

  const navigationTopRoutes = flattenNavigationKey(activeValidRoutes, 'top')

  const navigationSidebarRoutes = flattenSidebar(activeValidRoutes, 'side')

  return [navigationTopRoutes, navigationMenuRoutes, navigationSidebarRoutes, navigationDisabled(activeRoutes)]
}
