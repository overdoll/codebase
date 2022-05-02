import { Environment, RecordSource, Store } from 'relay-runtime'
import { createNetwork } from './network'
import CanUseDOM from '../operations/CanUseDOM'

const createEnvironment = (fetchFnOverride, existingStore: any): Environment => {
  const network = createNetwork(fetchFnOverride)
  const environment = new Environment({
    network,
    store: new Store(new RecordSource(existingStore), {}),
    isServer: !CanUseDOM
  })

  // @ts-expect-error
  environment.getNetwork().responseCache = network.responseCache

  return environment
}

export {
  createEnvironment
}
