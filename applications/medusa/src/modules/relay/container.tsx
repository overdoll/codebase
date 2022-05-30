import { RelayEnvironmentProvider, useRelayEnvironment } from 'react-relay'
import { Suspense, useMemo } from 'react'
import ErrorBoundary from '../operations/ErrorBoundary'
import { IEnvironment } from 'relay-runtime'
import { RequestProps } from '@//:types/app'
import ServerError from '@//:domain/500/ServerError/ServerError'

interface ReactRelayContainerProps {
  requestProps: RequestProps
  children: any
  environment: IEnvironment
}

export function ReactRelayContainer ({
  requestProps,
  environment,
  children
}: ReactRelayContainerProps): JSX.Element {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ErrorBoundary fallback={ServerError}>
        <Suspense fallback={null}>
          <Hydrate requestProps={requestProps}>
            {(props) => children(props)}
          </Hydrate>
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  )
}

interface HydrateProps {
  requestProps: RequestProps
  children: any
}

function Hydrate ({
  requestProps,
  children
}: HydrateProps): any {
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
          // @ts-expect-error
          .responseCache
          .set(params.id, variables, response)
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
