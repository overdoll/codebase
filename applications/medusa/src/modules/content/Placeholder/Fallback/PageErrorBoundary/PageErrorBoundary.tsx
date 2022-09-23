import ErrorBoundary from '../../../../operations/ErrorBoundary'
import { ReactNode } from 'react'
import ErrorContainer from '../../../PageLayout/Containers/ErrorContainer/ErrorContainer'
import PageErrorFallback from '../PageErrorFallback/PageErrorFallback'

interface Props {
  children: ReactNode
  loadQuery: () => (any)
}

export default function PageErrorBoundary (props: Props): JSX.Element {
  const {
    children,
    loadQuery
  } = props

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
