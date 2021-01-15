import { matchRoutes } from 'react-router-config';
import { fetchQuery } from 'react-relay/hooks';

/**
 * A custom function, which, when passed our routes, will take each route's queries, and preload
 * them for us, so that we can pass them down to our HTML file, while keeping our whole application client-side friendly
 *
 * @param routes
 * @param location
 * @param relayEnvironment
 * @returns {Promise<unknown>}
 */
export default async function preloadDataFromRoutes(
  routes,
  location,
  relayEnvironment,
) {
  // Find the initial match for the route
  const matches = matchRoutes(routes, location);

  for (let i = 0; i < matches.length; i++) {
    const { route, match: matchData } = matches[i];

    const queriesToPrepare = route.prepare(matchData.params);
    const queryKeys = Object.keys(queriesToPrepare);

    // For each route, fetch the query
    for (let ii = 0; ii < queryKeys.length; ii++) {
      const { query, variables, options } = queriesToPrepare[queryKeys[ii]];

      // If one of our queries errors out
      // TODO: could we insert the errors into the store and pass them down to the client in the future? right now we do 2 calls,
      // if it fails, it does one on the server, and catches it here. Then, another one is done in the client, and is caught by the error boundary
      try {
        await fetchQuery(
          relayEnvironment,
          query,
          variables,
          options,
        ).toPromise();
      } catch (e) {}
    }
  }
}
