import ErrorBoundary from '../../../../operations/ErrorBoundary'
import { ReactNode } from 'react'
import ErrorFallback from '../ErrorFallback/ErrorFallback'

interface Props {
  children: ReactNode
  loadQuery: () => (any)
}

// a component composed of ErrorBoundary and ErrorFallback to have simple fallbacks
export default function QueryErrorBoundary ({
  children,
  loadQuery
}: Props): JSX.Element {
  return (
    <ErrorBoundary
      fallback={({
        reset
      }) => (
        <ErrorFallback
          reset={reset}
          refetch={loadQuery}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
