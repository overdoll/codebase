import ErrorBoundary from '../../../../operations/ErrorBoundary'
import { ReactNode } from 'react'
import ErrorContainer from '../../../PageLayout/Containers/ErrorContainer/ErrorContainer'
import PageErrorFallback from '../PageErrorFallback/PageErrorFallback'

interface Props {
  children: ReactNode
  loadQuery: () => (any)
}

// a component composed of ErrorBoundary and ErrorFallback to have simple fallbacks
export default function PageErrorBoundary ({
  children,
  loadQuery
}: Props): JSX.Element {
  return (
    <ErrorBoundary
      fallback={({
        reset
      }) => (
        <ErrorContainer>
          <PageErrorFallback
            reset={reset}
            refetch={loadQuery}
          />
        </ErrorContainer>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
