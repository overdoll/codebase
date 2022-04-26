const withPreloaderCache = (fetchFn) => {
  return function fetchQuery (operation, variables) {
    return fetchFn(operation, variables)
  }
}

const fetchFunction = (fetchFn): any =>
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

export default fetchFunction
