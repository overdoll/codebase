/**
 * @flow
 */
import { matchRoutes } from 'react-router-config';
import { loadQuery } from 'react-relay/hooks';
import type { Route } from '../../client/routes';
import type { IEnvironment } from 'relay-runtime';

type Preload = {
  (pathname: string): void,
};

type Subscribe = {
  (sb: any): any,
};

type Get = {
  (): { entries: any, location: any },
};

type Router = {
  preloadCode: Preload,
  preload: Preload,
  subscribe: Subscribe,
  get: Get,
  history: any,
};

type RouterInstance = {
  cleanup: any,
  context: Router,
};

// Check if our route is valid (on the client), by running the "middleware" function
// The middleware function can either return true or false - if false, then the route won't be visible to the user and no API
// call will be made. If true, an API call will be made, and any other resolutions should be done within
// the component where the API call is made
const isRouteValid = (data, route) => {
  if (route.hasOwnProperty('middleware')) {
    for (let i = 0; i < route.middleware.length; i++) {
      // Middleware check failed
      if (!route.middleware[i](data)) return false;
    }
  }

  // Middleware check succeeded or didn't exist
  return true;
};

// Server router differs from ClientRouter in that it doesn't "subscribe" to the history, and will
// run "middleware" on each route to determine if the current user is allowed to access it
function createServerRouter(
  routes: Array<Route>,
  history: any,
  environment: IEnvironment,
  req,
) {
  const data = {
    environment,
    flash: req.flash,
  };

  // Find the initial match and prepare it
  const initialMatches = matchRouteWithFilter(
    routes,
    history,
    history.location,
    data,
  );

  const initialEntries = prepareMatches(initialMatches, environment);

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    get() {
      return {
        location: history.location,
        entries: initialEntries,
      };
    },
    preloadCode(pathname) {
      // preload just the code for a route, without storing the result
      matchRoutes(routes, pathname).forEach(({ route }) =>
        route.component.load(),
      );
    },
    preload(pathname) {
      prepareMatches(matchRoutes(routes, pathname), environment);
    },
  };

  // Return both the context object and a cleanup function
  return { context };
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
function createClientRouter(
  routes: Array<Route>,
  history: any,
  environment: IEnvironment,
): RouterInstance {
  // Find the initial match and prepare it
  const initialMatches = matchRoutes(routes, history.location.pathname);

  const initialEntries = prepareMatches(initialMatches, environment);

  let currentEntry = {
    location: history.location,
    entries: initialEntries,
  };

  // maintain a set of subscribers to the active entry
  let nextId = 0;
  const subscribers = new Map();

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanup = history.listen((location, action) => {
    if (location.pathname === currentEntry.location.pathname) {
      return;
    }
    const matches = matchRoutes(routes, history.location.pathname);
    const entries = prepareMatches(matches, environment);
    const nextEntry = {
      location,
      entries,
    };
    currentEntry = nextEntry;
    subscribers.forEach((cb) => cb(nextEntry));
  });

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    get() {
      return currentEntry;
    },
    preloadCode(pathname) {
      // preload just the code for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      matches.forEach(({ route }) => route.component.load());
    },
    preload(pathname) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      prepareMatches(matches, environment);
    },
    subscribe(cb) {
      const id = nextId++;
      const dispose = () => {
        subscribers.delete(id);
      };
      subscribers.set(id, cb);
      return dispose;
    },
  };

  // Return both the context object and a cleanup function
  return { cleanup, context };
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRouteWithFilter(routes, history, location, data) {
  const unparsedRoutes = matchRoutes(routes, location.pathname);

  // Recursively parse route, and use route environment source as a helper
  // Make sure that we are allowed to be in a route that we are using
  return unparsedRoutes.filter((route) =>
    isRouteValid({ ...data, history, location }, route.route),
  );
}

/**
 * Load the data for the matched route, given the params extracted from the route
 *
 * Inject RelayEnvironment
 */
function prepareMatches(matches, relayEnvironment) {
  return matches.map((match, index) => {
    const { route, match: matchData } = match;

    const prepared = convertPreparedToQueries(
      relayEnvironment,
      route.prepare,
      matchData.params,
      index,
    );

    const Component = route.component.get();
    if (Component == null) {
      route.component.load(); // eagerly load
    }
    return {
      component: route.component,
      prepared,
      routeData: matchData,
      id: route.component.getModuleId(),
    };
  });
}

/**
 *
 * Converts our "prepared" object into an actual routing key
 *
 */
function convertPreparedToQueries(environment, prepare, params, index) {
  const prepared = {};

  if (prepare === undefined) return prepared;

  const queriesToPrepare = prepare(params);
  const queryKeys = Object.keys(queriesToPrepare);

  // For each route, fetch the query
  for (let ii = 0; ii < queryKeys.length; ii++) {
    const key = queryKeys[ii];

    const { query, variables, options } = queriesToPrepare[key];

    prepared[key] = loadQuery(environment, query, variables, options);
  }

  return prepared;
}

export type { Router };

export { createClientRouter, createServerRouter };
