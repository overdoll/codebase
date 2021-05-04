/**
 * @flow
 */
import type { IEnvironment } from 'relay-runtime';
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import axios from 'axios';

// Get hydrated data from store
const data = JSON.parse(
  document.getElementById('relay-store')?.textContent || '{}',
);

// Get CSRF token
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

/**
 * Relay fetch function - uses axios. Passes CSRF token from the document as well
 */
async function fetchRelay(params, variables, _cacheConfig) {
  const response = await axios.post(
    '/api/graphql',
    {
      operationName: params.name,
      queryId: params.id,
      variables,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
    },
  );

  const json = response.data;

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    throw new Error(JSON.stringify(json.errors));
  }

  // Otherwise, return the full payload.
  return json;
}

const subscribe = (params, variables) => {
  const subscriptionClient = new SubscriptionClient(
    `wss://${window.location.hostname}/api/graphql`,
    {
      reconnect: false,
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
    csrf: csrfToken,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  return Observable.from(subscribeObservable);
};

// Export a singleton instance of Relay Environment configured with our network layer:
export default (new Environment({
  network: Network.create(fetchRelay, subscribe),
  store: new Store(new RecordSource(data), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
}): IEnvironment);

export { fetchRelay, subscribe };
