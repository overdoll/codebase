import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from 'relay-runtime';
import { createClient } from 'graphql-ws';

/**
 * Relay requires developers to configure a "fetch" function that tells Relay how to load
 * the results of GraphQL queries from your server (or other data source). See more at
 * https://relay.dev/docs/en/quick-start-guide#relay-environment.
 */
async function fetchRelay(params, variables, _cacheConfig) {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: params.name,
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: params.id,
        },
      },
      variables,
    }),
  });

  // Get the response as JSON
  const json = await response.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.log(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        params.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }

  // Otherwise, return the full payload.
  return json;
}

const subscriptionsClient = createClient({
  url: 'ws://localhost/api/graphql',
  connectionParams: () => {
    return {};
  },
});

// yes, both fetch AND subscribe handled in one implementation
function fetchOrSubscribe(params, variables) {
  return Observable.create(sink => {
    return subscriptionsClient.subscribe(
      {
        operationName: params.name,
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash: params.id,
          },
        },
        variables,
      },
      {
        ...sink,
        error: err => {
          if (err instanceof Error) {
            sink.error(err);
          } else if (err instanceof CloseEvent) {
            sink.error(
              new Error(
                `Socket closed with event ${err.code}` + err.reason
                  ? `: ${err.reason}` // reason will be available on clean closes
                  : '',
              ),
            );
          } else {
            sink.error(err);
          }
        },
      },
    );
  });
}

// Export a singleton instance of Relay Environment configured with our network layer:
export default new Environment({
  network: Network.create(fetchRelay, fetchOrSubscribe),
  store: new Store(new RecordSource(), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
});
