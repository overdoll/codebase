import { matchRoutes } from 'react-router-config';
import { fetchQuery, loadQuery } from 'react-relay/hooks';

/**
 * A custom function, which, when passed our routes, will take each route's queries, and preload
 * them for us, so that we can use them in our client application.
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
      // TODO: could we insert the errors into the store and pass them down to the client in the future?
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
