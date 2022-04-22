import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import fetchQuery from './fetchQuery'
import moduleLoader from './moduleLoader'

const IS_SERVER = typeof window === typeof undefined

let environment

export function getEnvironment (fetchFn) {
  // Always create a new environment on the server
  if (IS_SERVER) {
    return createEnvironment(fetchFn)
  }

  if (environment == null) {
    environment = createEnvironment(fetchFn)
  }

  return environment
}

const CLIENT_DEBUG = true
const SERVER_DEBUG = false

const createEnvironment = (fetchFn) => {
  // Operation loader is reponsible for loading JS modules/components
  // for data-processing and rendering
  const operationLoader = {
    get: (name) => moduleLoader(name).get(),
    load: (name) => moduleLoader(name).load()
  }

  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery(fetchFn)),
    store: new Store(new RecordSource(), { operationLoader }),
    operationLoader,
    isServer: IS_SERVER,
    log (event) {
      if ((IS_SERVER && SERVER_DEBUG) || (!IS_SERVER && CLIENT_DEBUG)) {
        console.debug('[relay environment event]', event)
      }
    }
  })
}
