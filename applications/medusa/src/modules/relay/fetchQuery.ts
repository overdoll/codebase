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

export const resetOperationResponseCache = (): void => {
  operationResponseCache = {}
}

const withPreloaderCache = (fetchFn) => {
  return function fetchQuery (operation, variables) {
    const cacheKey = getOperationResponseCacheKey(operation, variables)
    const cachedResponse = operationResponseCache[cacheKey]
    if (cachedResponse != null) {
      // TODO: should empty cache, but right now it double-renders because of a weird error, so we skip for now
      //   delete operationResponseCache[cacheKey]
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

const registerModuleLoaders = (modules): void => {
  modules.forEach((module) => {
    registerLoader(module, async () => await import(`../../__generated__/${module}`))
  })
}

const fetchFunction = (fetchFn) => withModuleLoader(
  withPreloaderCache(async (operation, variables) => {
    return fetchFn({
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
