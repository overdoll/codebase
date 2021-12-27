import matchRoutes from './matchRoutes'
import { fetchQuery, loadQuery, PreloadedQuery } from 'react-relay/hooks'
import { ClientResource, PromisedResource, ServerResource } from '../operations/JSResource'
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
  i18n: typeof i18n
}

export type Middleware = (props: MiddlewareT) => boolean

interface ResourceDependency {
  resource: ClientResource | ServerResource | PromisedResource
  then: (data: any) => void
}

export interface Route {
  component: ClientResource | ServerResource | PromisedResource
  dependencies?: ResourceDependency[]
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
  component: ClientResource
  dependencies?: ResourceDependency[]
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
  staticContext?: StaticContext
}

export interface StaticContext {
  // custom url for SSR
  url?: string
  // custom status code, i.e. 404's
  status?: number
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
  req,
  trackedModules: string[],
  staticContext: StaticContext
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
    flash: req.flash,
    i18n: req.i18n
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

  const initialEntries = await prepareMatchesServer(initialMatches, prepareOptions, environment, req.i18n, trackedModules)

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    staticContext,
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
  const initialMatches = matchRoutes(routes as any, history.location.pathname)

  const prepareOptions = {
    query: new URLSearchParams(history.location.search),
    cookies: new Cookies()
  }

  const initialEntries = prepareMatchesClient(initialMatches, prepareOptions, environment)

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

    const matches = matchRoutes(routes as any, history.location.pathname)

    const prepareOptions = {
      query: new URLSearchParams(history.location.search),
      cookies: new Cookies()
    }

    const entries = prepareMatchesClient(matches, prepareOptions, environment)
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
      const matches: RouteMatch[] = matchRoutes(routes as any, pathname) as unknown as RouteMatch[]

      matches.forEach(({ route }) => {
        if (route.component.get() == null) {
          void route.component.load(environment)
        }

        if (route.dependencies != null) {
          route.dependencies.forEach(dep => {
            if (dep.resource.get() != null) {
              return
            }

            void dep.resource.load(environment).then(data => dep.then({
              data,
              environment,
              i18n: i18n
            }))
          })
        }
      })
    },
    preload (pathname) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes as any, pathname)

      const prepareOptions = {
        query: new URLSearchParams(pathname),
        cookies: new Cookies()
      }

      prepareMatchesClient(matches, prepareOptions, environment)
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
  const unparsedRoutes: RouteMatch[] = matchRoutes(routes, location.pathname) as unknown as RouteMatch[]

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

function prepareMatches (matches, prepareOptions, relayEnvironment): PreparedEntry[] {
  return matches.map((match, index) => {
    const matchData = match.match
    const route: Route = match.route

    const prepared = convertPreparedToQueries(
      relayEnvironment,
      route.prepare,
      {
        ...prepareOptions,
        params: matchData.params
      }
    )

    return {
      component: route.component,
      dependencies: route.dependencies,
      prepared,
      routeData: matchData,
      id: route.component.getModuleId()
    }
  })
}

/**
 * Load the data for the matched route, given the params extracted from the route
 *
 * Inject RelayEnvironment
 */
async function prepareMatchesServer (matches, prepareOptions, relayEnvironment, i18n, trackedModules): Promise<PreparedEntry[]> {
  for (const match of matches) {
    const route: Route = match.route

    trackedModules.push(route.component.getModuleId(relayEnvironment))

    if (route.dependencies != null) {
      for (const dep of route.dependencies) {
        const result = dep.resource.get(relayEnvironment)
        // const res = dep.resource.loadSync(relayEnvironment)
        dep.then({
          data: result,
          environment: relayEnvironment,
          i18n
        })
        trackedModules.push(dep.resource.getModuleId(relayEnvironment))
      }
    }
  }

  return prepareMatches(matches, prepareOptions, relayEnvironment)
}

/**
 * Load the data for the matched route, given the params extracted from the route
 *
 * Inject RelayEnvironment
 */
function prepareMatchesClient (matches, prepareOptions, relayEnvironment): PreparedEntry[] {
  for (const match of matches) {
    const route: Route = match.route
    // load synchronously on the server
    const Component = route.component.get()
    if (Component == null) {
      void route.component.load(relayEnvironment) // eagerly load
    }

    if (route.dependencies != null) {
      route.dependencies.forEach(dep => {
        const result = dep.resource.get()

        if (result == null) {
          void dep.resource.load(relayEnvironment).then(data => dep.then({
            data,
            environment: relayEnvironment,
            i18n: i18n
          }))
        } else {
          dep.then({
            data: result,
            environment: relayEnvironment,
            i18n: i18n
          })
        }
      })
    }
  }

  return prepareMatches(matches, prepareOptions, relayEnvironment)
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
