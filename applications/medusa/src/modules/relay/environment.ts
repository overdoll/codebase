import { Environment, RecordSource, Store } from 'relay-runtime'
import { createNetwork } from './network'
import CanUseDOM from '../operations/CanUseDOM'

const CLIENT_DEBUG = true
const SERVER_DEBUG = false

const createEnvironment = (fetchFnOverride, existingStore: any): Environment => {
  const network = createNetwork(fetchFnOverride)
  const environment = new Environment({
    network,
    store: new Store(new RecordSource(existingStore), {}),
    isServer: CanUseDOM,
    log (event) {
      if ((!CanUseDOM && SERVER_DEBUG) || (CanUseDOM && CLIENT_DEBUG)) {
        console.debug('[relay environment event]', event)
      }
    }
  })

  // @ts-expect-error
  environment.getNetwork().responseCache = network.responseCache

  return environment
}

export {
  createEnvironment
}
