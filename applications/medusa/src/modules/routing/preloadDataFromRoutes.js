import { matchRoutes } from 'react-router-config';
import { fetchQuery } from 'react-relay/hooks';

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

    const data = route.prepare(matchData.params);

    if (data !== null) {
      const { query, variables, options } = data[Object.keys(data)[0]];

      await fetchQuery(relayEnvironment, query, variables, options).toPromise();
    }
  }
}
