/**
 * @flow
 */
import { matchRoutes } from 'react-router-config';
import { fetchQuery, loadQuery } from 'react-relay/hooks';
import type { IEnvironment } from 'relay-runtime/store/RelayStoreTypes';
import type { Resource } from '@//:modules/utilities/JSResource';

export type Location = $ReadOnly<{
  pathname: string,
  search: string,
  hash: string,
  key?: string,
  ...
}>;

export type LocationShape = {
  pathname?: string,
  search?: string,
  hash?: string,
  ...
};

type HistoryAction = 'PUSH' | 'REPLACE' | 'POP';

type Params = { [key: string]: ?string, ... }

export type Match = {
  params: Params,
  isExact: boolean,
  path: string,
  url: string,
  ...
};

export type RouterHistory = {
  length: number,
  location: Location,
  action: HistoryAction,
  listen (
    callback: (location: Location, action: HistoryAction) => void
  ): () => void,
  push (path: string | LocationShape): void,
  replace (path: string | LocationShape): void,
  go (n: number): void,
  goBack (): void,
  goForward (): void,
  canGo?: (n: number) => boolean,
  block (
    callback: string | (location: Location, action: HistoryAction) => ?string
  ): () => void,
  ...
};

export type Middleware = ({ history: RouterHistory, environment: IEnvironment }) => boolean

export type Route = {
  component: Resource,
  prepare?: (Params) => {},
  middleware?: Array<Middleware>,
  exact?: boolean,
  routes?: Array<Route>,
  path?: string,
};

export type RouteMatch = ({ match: Match, route: Route })

export type Preload = {
  (pathname: string): void,
};

export type Subscribe = {
  (sb: () => void): () => void,
};

export type PreparedEntry = {
  component: Node,
  prepared: Params,
  routeData: Match,
  id: string,
}

export type RouterInit = { entries: Array<PreparedEntry>, location: Location }

export type Get =
  () => RouterInit

export type Router = {
  preloadCode: Preload,
  preload: Preload,
  subscribe: Subscribe,
  get: Get,
  history: RouterHistory,
};

export type RouterInstance = {
  cleanup: () => void,
  context: Router,
};

// Check if our route is valid (on the client), by running the "middleware" function
// The middleware function can either return true or false - if false, then the route won't be visible to the user and no API
// call will be made. If true, an API call will be made, and any other resolutions should be done within
// the component where the API call is made
const isRouteValid = (data, route) => {
  if (Object.prototype.hasOwnProperty.call(route, 'middleware')) {
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
  routes: Array<Route>,
  history: RouterHistory,
  environment: IEnvironment,
  req
): RouterInstance {
  // Before going further and creating
  // our router, we pre-emptively resolve the RootQuery routes, so that the user object
  // can be available for permission checking & redirecting on the server

  let targets = []

  routes.forEach(route => {
    const root = route.prepare({})
    const rootKeys = Object.keys(root)

    // Get all prepared statements, and wait for loadQuery to resolve
    targets = targets.concat(rootKeys.map(
      key =>
        fetchQuery(
          environment,
          root[key].query,
          root[key].variables,
          root[key].options
        ).toPromise()
    ))
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

  const parameters = new URLSearchParams(history.location.search)

  const initialEntries = prepareMatches(initialMatches, parameters, environment)

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
      const matches: Array<RouteMatch> = matchRoutes(routes, pathname)
      // preload just the code for a route, without storing the result
      matches.forEach(({ route }) =>
        route.component.load()
      )
    },
    preload (pathname) {
      prepareMatches(matchRoutes(routes, pathname), new URLSearchParams(pathname), environment)
    },
    subscribe (cb) {

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
  routes: Array<Route>,
  history: RouterHistory,
  environment: IEnvironment
): RouterInstance {
  // Find the initial match and prepare it
  const initialMatches = matchRoutes(routes, history.location.pathname)
  const parameters = new URLSearchParams(history.location.search)

  const initialEntries = prepareMatches(initialMatches, parameters, environment)

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
    const parameters = new URLSearchParams(history.location.search)
    const entries = prepareMatches(matches, parameters, environment)
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
      const matches: Array<RouteMatch> = matchRoutes(routes, pathname)
      matches.forEach(({ route }) => route.component.load())
    },
    preload (pathname) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname)
      prepareMatches(matches, new URLSearchParams(pathname), environment)
    },
    subscribe (cb) {
      const id = nextId++
      const dispose = () => {
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
function matchRouteWithFilter (routes, history, location, data) {
  const unparsedRoutes: Array<RouteMatch> = matchRoutes(routes, location.pathname)

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
function prepareMatches (matches, query, relayEnvironment) {
  return matches.map((match, index) => {
    const {
      route,
      match: matchData
    } = match

    const prepared = convertPreparedToQueries(
      relayEnvironment,
      route.prepare,
      matchData.params,
      query,
      index
    )

    const Component = route.component.get()
    if (!Component) {
      route.component.load() // eagerly load
    }

    return {
      component: route.component,
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
function convertPreparedToQueries (environment, prepare, params, query, index) {
  const prepared = {}

  if (prepare === undefined) return prepared

  const queriesToPrepare = prepare(params, query)
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
