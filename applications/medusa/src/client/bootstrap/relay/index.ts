import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import axios from 'axios'
import SafeJSONParse from '@//:modules/operations/SafeJSONParse'
import { refreshUpdateTimer } from '../update'

// Get hydrated data from store
const data = SafeJSONParse(
  document.getElementById('relay-store')?.textContent ?? '{}'
)

// Get CSRF token
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content')

/**
 * Relay fetch function - uses axios. Passes CSRF token from the document as well
 */
async function fetchRelay (params, variables): Promise<any> {
  // call an async function to refresh the update timer
  await refreshUpdateTimer()

  const response = await axios.post(
    '/api/graphql',
    {
      // operationName: params.name,
      query: 'PERSISTED_QUERY',
      variables,
      extensions: {
        queryId: params.id
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      }
    }
  )

  const json = response.data

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    const error = new Error(JSON.stringify(json.errors))
    console.log(error)
    throw error
  }

  // Otherwise, return the full payload.
  return json
}

// Export a singleton instance of Relay Environment configured with our network layer:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource(data), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10
  })
})

export { fetchRelay }
