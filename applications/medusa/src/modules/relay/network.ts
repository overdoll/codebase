import { INetwork, Network, QueryResponseCache } from 'relay-runtime'
import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode'
import { CacheConfig, Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'
import { GraphQLResponse } from 'relay-runtime/lib/network/RelayNetworkTypes'

const ONE_MINUTE_IN_MS = 60 * 1000

export function createNetwork (fetchFnOverride): INetwork {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS
  })

  async function fetchResponse (operation, variables, cacheConfig): Promise<GraphQLResponse> {
    const { id } = operation

    const isQuery = operation.operationKind === 'query'
    const forceFetch: boolean = cacheConfig != null ? cacheConfig.force : false
    if (isQuery && !forceFetch) {
      const fromCache = responseCache.get(id, variables)
      if (fromCache != null) {
        return fromCache
      }
    }

    return fetchFnOverride({
      operationName: operation.name,
      query: 'PERSISTED_QUERY',
      variables,
      extensions: {
        queryId: operation.id
      }
    }, operation.operationKind)
  }

  async function fetchFn (request: RequestParameters, variables: Variables, cacheConfig: CacheConfig): Promise<GraphQLResponse> {
    return await fetchResponse(request, variables, cacheConfig)
  }

  const network = Network.create(fetchFn)
  // @ts-expect-error
  network.responseCache = responseCache
  return network
}
