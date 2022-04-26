import { Network, QueryResponseCache } from 'relay-runtime'

const ONE_MINUTE_IN_MS = 60 * 1000

export function createNetwork (fetchFnOverride) {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS
  })

  async function fetchResponse (operation, variables, cacheConfig) {
    const { id } = operation

    const isQuery = operation.operationKind === 'query'
    const forceFetch = cacheConfig && cacheConfig.force
    if (isQuery && !forceFetch) {
      const fromCache = responseCache.get(id, variables)
      if (fromCache != null) {
        return await Promise.resolve(fromCache)
      }
    }

    return await fetchFnOverride({
      operationName: operation.name,
      query: 'PERSISTED_QUERY',
      variables,
      extensions: {
        queryId: operation.id
      }
    })
  }

  async function fetchFn (...args) {
    return await fetchResponse(...args)
  }

  const network = Network.create(fetchFn)
  network.responseCache = responseCache
  return network
}
