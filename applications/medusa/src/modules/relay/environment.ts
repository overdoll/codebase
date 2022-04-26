import { Environment, RecordSource, Store } from 'relay-runtime'
import moduleLoader from './moduleLoader'
import { createNetwork } from './network'

const IS_SERVER = typeof window === typeof undefined

const CLIENT_DEBUG = true
const SERVER_DEBUG = false

const createEnvironment = (fetchFnOverride) => {
  // Operation loader is reponsible for loading JS modules/components
  // for data-processing and rendering
  const operationLoader = {
    get: (name) => moduleLoader(name).get(),
    load: (name) => moduleLoader(name).load()
  }

  const network = createNetwork(fetchFnOverride)
  const environment = new Environment({
    network,
    store: new Store(new RecordSource(), { operationLoader }),
    operationLoader,
    isServer: IS_SERVER,
    log (event) {
      if ((IS_SERVER && SERVER_DEBUG) || (!IS_SERVER && CLIENT_DEBUG)) {
        console.debug('[relay environment event]', event)
      }
    }
  })

  environment.getNetwork().responseCache = network.responseCache

  return environment
}

export {
  createEnvironment
}
