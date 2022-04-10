import { registerLoader } from './moduleLoader'

// TODO: think about lifetime of cache entries
let operationResponseCache = {}

export const addToOperationResponseCache = (cacheKey, response) => {
  operationResponseCache = {
    ...operationResponseCache,
    [cacheKey]: response
  }
}

export const getOperationResponseCacheKey = (operation, variables) => {
  // TODO: stable stringify?
  return `${operation.id}_${JSON.stringify(variables)}`
}

export const resetOperationResponseCache = () => {
  operationResponseCache = {}
}

const withPreloaderCache = (fetchFn) => {
  return function fetchQuery (operation, variables) {
    const cacheKey = getOperationResponseCacheKey(operation, variables)
    const cachedResponse = operationResponseCache[cacheKey]
    if (cachedResponse != null) {
      delete operationResponseCache[cacheKey]
      return Promise.resolve(cachedResponse)
    }
    return fetchFn(operation, variables)
  }
}

const withModuleLoader = (fetchFn) => {
  return function fetchQuery (...args) {
    return fetchFn(...args).then((response) => {
      if (Array.isArray(response.extensions?.modules)) {
        registerModuleLoaders(response.extensions.modules)
      }
      return response
    })
  }
}

const registerModuleLoaders = (modules) => {
  modules.forEach((module) => {
    registerLoader(module, async () => await import(`../../__generated__/${module}`))
  })
}

const fetchFunction = (fetchFn) => withModuleLoader(
  withPreloaderCache(async (operation, variables) => {
    // TODO: figure out how not to use hardcoded hostname and port
    // TODO: consider bypassing api fetch and directly invoking graphql on server
    return await fetchFn({
      operationName: operation.name,
      query: 'PERSISTED_QUERY',
      variables,
      extensions: {
        queryId: operation.id
      }
    })
  })
)

export default fetchFunction
