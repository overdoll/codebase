import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import axios from 'axios';

// Get hydrated data from store
const data = JSON.parse(document.getElementById('relay-store').textContent);

/**
 * Relay requires developers to configure a "fetch" function that tells Relay how to load
 * the results of GraphQL queries from your index (or other data source). See more at
 * https://relay.dev/docs/en/quick-start-guide#relay-environment.
 */
async function fetchRelay(params, variables, _cacheConfig) {
  const response = await axios({
    url: '/api/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: 'empty',
      operationName: params.name,
      extensions: {
        apq: {
          hash: params.id,
        },
      },
      variables,
    },
  });

  const json = response.data;

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

const subscribe = (params, variables) => {
  const subscriptionClient = new SubscriptionClient(
    `wss://${window.location.hostname}/api/graphql`,
    {
      reconnect: true,
    },
  );

  const subscribeObservable = subscriptionClient.request({
    operationName: params.name,
    extensions: {
      apq: {
        hash: params.id,
      },
    },
    variables,
    query: 'empty',
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  return Observable.from(subscribeObservable);
};

// Export a singleton instance of Relay Environment configured with our network layer:
export default new Environment({
  network: Network.create(fetchRelay, subscribe),
  store: new Store(new RecordSource(data), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
});
