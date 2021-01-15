import { matchRoutes } from 'react-router-config';
import { loadQuery } from 'react-relay/hooks';

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a prepare() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 *
 * Note: History is created by either the index or the client, since we can't use the same history for both.
 *
 */
export default function createRouter(routes, history, relayEnvironment) {
  // Find the initial match and prepare it
  const initialMatches = matchRoute(routes, history.location);
  const initialEntries = prepareMatches(initialMatches, relayEnvironment);
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
    const matches = matchRoute(routes, location, relayEnvironment);
    const entries = prepareMatches(matches, relayEnvironment);
    const nextEntry = {
      location,
      entries,
    };
    currentEntry = nextEntry;
    subscribers.forEach(cb => cb(nextEntry));
  });

  // The actual object that will be passed on the RoutingConext.
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
      prepareMatches(matches, relayEnvironment);
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
function matchRoute(routes, location, relayEnvironment) {
  const matchedRoutes = matchRoutes(routes, location.pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error('No route for ' + location.pathname);
  }
  return matchedRoutes;
}

/**
 * Load the data for the matched route, given the params extracted from the route
 *
 * Inject RelayEnvironment
 */
function prepareMatches(matches, relayEnvironment) {
  return matches.map(match => {
    const { route, match: matchData } = match;

    const prepared = convertPreparedToQueries(
      relayEnvironment,
      route.prepare,
      matchData.params,
    );

    const Component = route.component.get();
    if (Component == null) {
      route.component.load(); // eagerly load
    }
    return { component: route.component, prepared, routeData: matchData };
  });
}

/**
 *
 * Converts our "prepared" object into an actual routing key
 *
 */
function convertPreparedToQueries(relayEnvironment, prepare, params) {
  const prepared = {};

  const queriesToPrepare = prepare(params);

  Object.keys(queriesToPrepare).forEach(queryKey => {
    const { query, variables, options } = queriesToPrepare[queryKey];

    // run a loadQuery for each of our queries
    prepared[queryKey] = loadQuery(relayEnvironment, query, variables, options);
  });

  return prepared;
}
