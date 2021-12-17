import { matchRoutes } from 'react-router-config'
import { fetchQuery, loadQuery, PreloadedQuery } from 'react-relay/hooks'
import { Resource } from '../operations/JSResource'
import Cookies from 'universal-cookie'
import type { History, Location } from 'history'
import { IEnvironment } from 'relay-runtime'
import { i18n } from '@lingui/core'

export interface LocationShape {
  pathname?: string
  search?: string
  hash?: string
}

export interface Params {
  [key: string]: string | null
}

export interface Match {
  params: Params
  isExact: boolean
  path: string
  url: string
}

interface MiddlewareT {
  history: History
  environment: IEnvironment
}

export type Middleware = (props: MiddlewareT) => boolean

export interface Route {
  component: Resource
  translations?: Resource
  prepare?: (Params) => {}
  middleware?: Middleware[]
  exact?: boolean
  routes?: Route[]
  path?: string
  hidden?: boolean
}

export interface RouteMatch {
  match: Match
  route: Route
}

export type Preload = (pathname: string) => void

export type Subscribe = (sb: (sb) => void) => () => void

export interface PreparedEntry {
  component: Resource
  translations?: Resource
  prepared: Params
  routeData: Match
  id: string
  children?: JSX.Element
}

export interface RouterInit {
  entries: PreparedEntry[]
  location: Location
}

export type Get =
  () => RouterInit

export interface Router {
  preloadCode: Preload
  preload: Preload
  subscribe: Subscribe
  get: Get
  history: History
}

export interface RouterInstance {
  cleanup: () => void
  context: Router
}

// Check if our route is valid (on the client), by running the "middleware" function
// The middleware function can either return true or false - if false, then the route won't be visible to the user and no API
// call will be made. If true, an API call will be made, and any other resolutions should be done within
// the component where the API call is made
const isRouteValid = (data, route: Route): boolean => {
  if (route.middleware != null) {
    for (let i = 0; i < route.middleware.length; i++) {
      // Middleware check failed
      if (!route.middleware[i](data)) return false
    }
  }

  // Middleware check succeeded or didn't exist
  return true
}

// Server router differs from ClientRouter in that it doesn't "subscribe" to the history, and will
// run "middleware" on each route to determine if the current user is allowed to access it
async function createServerRouter (
  routes: Route[],
  history: History,
  environment: IEnvironment,
  req
): Promise<RouterInstance> {
  // Before going further and creating
  // our router, we pre-emptively resolve the RootQuery routes, so that the user object
  // can be available for permission checking & redirecting on the server

  let targets: Array<Promise<any>> = []

  routes.forEach(route => {
    if (route.prepare != null) {
      const root = route.prepare({})
      const rootKeys = Object.keys(root)

      const mapKeys = rootKeys.map(
        async key =>
          await fetchQuery(
            environment,
            root[key].query,
            root[key].variables,
            root[key].options
          ).toPromise()
      )

      // Get all prepared statements, and wait for loadQuery to resolve
      targets = targets.concat(mapKeys)
    }
  })

  await Promise.all(targets)

  const data = {
    environment,
    flash: req.flash
  }

  // Find the initial match and prepare it
  const initialMatches = matchRouteWithFilter(
    routes,
    history,
    history.location,
    data
  )

  const prepareOptions = {
    query: new URLSearchParams(history.location.search),
    cookies: new Cookies(req.headers.cookie)
  }

  const initialEntries = prepareMatches(initialMatches, prepareOptions, environment)

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    get () {
      return {
        location: history.location,
        entries: initialEntries
      }
    },
    preloadCode (pathname) {
    },
    preload (pathname) {
    },
    subscribe (sb: (sb) => void) {
      return () => {
      }
    }
  }

  // Return both the context object and a cleanup function
  return {
    context,
    cleanup: () => {
    }
  }
}

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a prepare() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 *
 * Note: History is created by either the index or the client, since we can't use the same history for both.
 *
 */
function createClientRouter (
  routes: Route[],
  history: History,
  environment: IEnvironment
): RouterInstance {
  // Find the initial match and prepare it
  const initialMatches = matchRoutes(routes, history.location.pathname)

  const prepareOptions = {
    query: new URLSearchParams(history.location.search),
    cookies: new Cookies()
  }

  const initialEntries = prepareMatches(initialMatches, prepareOptions, environment)

  let currentEntry: RouterInit = {
    location: history.location,
    entries: initialEntries
  }

  // maintain a set of subscribers to the active entry
  let nextId = 0
  const subscribers = new Map()

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanup = history.listen((location, action) => {
    if (location.pathname === currentEntry.location.pathname) {
      return
    }
    const matches = matchRoutes(routes, history.location.pathname)

    const prepareOptions = {
      query: new URLSearchParams(history.location.search),
      cookies: new Cookies()
    }

    const entries = prepareMatches(matches, prepareOptions, environment)
    const nextEntry = {
      location,
      entries
    }
    currentEntry = nextEntry
    subscribers.forEach(cb => cb(nextEntry))
  })

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    get (): RouterInit {
      return currentEntry
    },
    preloadCode (pathname) {
      // preload just the code for a route, without storing the result
      const matches: RouteMatch[] = matchRoutes(routes, pathname)
      matches.forEach(({ route }) => {
        void route.component.load()

        if (route.translations != null) {
          void route.translations.load(i18n.locale).then(({ messages }) => i18n._load(i18n.locale, messages))
        }
      })
    },
    preload (pathname) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname)

      const prepareOptions = {
        query: new URLSearchParams(pathname),
        cookies: new Cookies()
      }

      prepareMatches(matches, prepareOptions, environment)
    },
    subscribe (cb) {
      const id = nextId++
      const dispose = (): void => {
        subscribers.delete(id)
      }
      subscribers.set(id, cb)
      return dispose
    }
  }

  // Return both the context object and a cleanup function
  return {
    cleanup,
    context
  }
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRouteWithFilter (routes, history, location, data): RouteMatch[] {
  const unparsedRoutes: RouteMatch[] = matchRoutes(routes, location.pathname)

  // Recursively parse route, and use route environment source as a helper
  // Make sure that we are allowed to be in a route that we are using
  return unparsedRoutes.filter(route =>
    isRouteValid({
      ...data,
      history,
      location
    }, route.route)
  )
}

/**
 * Load the data for the matched route, given the params extracted from the route
 *
 * Inject RelayEnvironment
 */
function prepareMatches (matches, prepareOptions, relayEnvironment): PreparedEntry[] {
  return matches.map((match, index) => {
    const {
      route,
      match: matchData
    } = match

    const prepared = convertPreparedToQueries(
      relayEnvironment,
      route.prepare,
      {
        ...prepareOptions,
        params: matchData.params
      }
    )

    const Component = route.component.get()
    if (Component == null) {
      route.component.load() // eagerly load
    }

    if (route.translations != null) {
      const translations = route.translations.get()

      // on client, translations will be loaded async
      // on server, they are already available
      if (translations == null) {
        route.translations.load(i18n.locale).then(({ messages }) => i18n._load(i18n.locale, messages))
      } else {
        i18n._load(i18n.locale, translations.messages)
      }
    }

    return {
      component: route.component,
      translations: route.translations,
      prepared,
      routeData: matchData,
      id: route.component.getModuleId()
    }
  })
}

/**
 *
 * Converts our "prepared" object into an actual routing key
 *
 */
interface Prepared {
  [s: string]: PreloadedQuery<any>
}

function convertPreparedToQueries (environment, prepare, prepareOptions): Prepared {
  const prepared: Prepared = {}

  if (prepare === undefined) return prepared

  const queriesToPrepare = prepare(prepareOptions)
  const queryKeys = Object.keys(queriesToPrepare)

  // For each route, fetch the query
  for (let ii = 0; ii < queryKeys.length; ii++) {
    const key = queryKeys[ii]

    const {
      query,
      variables,
      options
    } = queriesToPrepare[key]

    prepared[key] = loadQuery(environment, query, variables, options)
  }

  return prepared
}

export { createClientRouter, createServerRouter }
