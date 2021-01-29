import { matchRoutes } from 'react-router-config';
import { fetchQuery } from 'react-relay/hooks';
import { After, Before, Run } from '@//:modules/routing/Middleware';

/**
 * A custom function, which, when passed our routes, will take each route's queries, and preload
 * them for us, so that we can pass them down to our HTML file, while keeping our whole application client-side friendly
 *
 * @param routes
 * @param location
 * @param environment
 * @returns {Promise<unknown>}
 */
export default async function preloadDataFromRoutes(
  routes,
  location,
  environment,
  context,
) {
  // Find the initial match for the route
  const matches = matchRoutes(routes, location);

  for (let i = 0; i < matches.length; i++) {
    const { route, match: matchData } = matches[i];

    context.params = matchData.params;
    const queriesToPrepare = route.prepare(matchData.params);
    const queryKeys = Object.keys(queriesToPrepare);

    let beforeMiddleware = [];
    let afterMiddleware = [];

    // Parse middleware classes and add them to our list
    if (route.hasOwnProperty('middleware')) {
      route.middleware.forEach(item => {
        if (item instanceof Before) {
          beforeMiddleware = item.getMiddleware();
        } else if (item instanceof After) {
          afterMiddleware = item.getMiddleware();
        }
      });
    }

    // Run middleware "pre" checks
    // Skip if "false" is returned
    if (!Run(beforeMiddleware, environment, context)) continue;

    // For each route, fetch the query
    for (let ii = 0; ii < queryKeys.length; ii++) {
      const { query, variables, options } = queriesToPrepare[queryKeys[ii]];
      // If one of our queries errors out
      // if it fails, it does one on the server, and catches it here. Then, another one is done in the client, and is caught by the error boundary
      try {
        await fetchQuery(environment, query, variables, options).toPromise();
      } catch (e) {
        console.log(e);
      }
    }

    // Middleware post checks
    Run(afterMiddleware, environment, context);
  }
}
