import { RelayEnvironmentProvider, useRelayEnvironment } from 'react-relay'
import { Suspense, useMemo } from 'react'
import ErrorBoundary from '../operations/ErrorBoundary'

export function ReactRelayContainer ({
  requestProps,
  environment,
  children
}): any {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Hydrate requestProps={requestProps}>
            {(props) => children(props)}
          </Hydrate>
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  )
}

function Hydrate ({
  requestProps,
  children
}): any {
  const environment = useRelayEnvironment()

  return children(
    useMemo(() => {
      if (requestProps == null) {
        return requestProps
      }
      const {
        preloadedQueryResults,
        ...otherProps
      } = requestProps
      if (preloadedQueryResults == null) {
        return requestProps
      }

      const queryRefs = {}
      for (const [queryName, {
        params,
        variables,
        response
      }] of Object.entries(
          preloadedQueryResults
        )) {
        environment
          .getNetwork()
          .responseCache
          .set(params.id, variables, response)
        // TODO: create using a function exported from react-relay package
        queryRefs[queryName] = {
          environment,
          fetchKey: params.id,
          fetchPolicy: 'store-or-network',
          isDisposed: false,
          name: params.name,
          kind: 'PreloadedQuery',
          variables
        }
      }

      return {
        ...otherProps,
        queryRefs
      }
    }, [requestProps])
  )
}
