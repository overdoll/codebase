import { ReactNode } from 'react'
import ErrorBoundary from '../../../../../operations/ErrorBoundary'
import PostsErrorFallback from './PostsErrorFallback/PostsErrorFallback'

interface Props {
  children: ReactNode
  loadQuery: () => (any)
}

export default function LazyPostsErrorBoundary (props: Props): JSX.Element {
  const {
    children,
    loadQuery
  } = props

  return (
    <ErrorBoundary
      fallback={({
        reset
      }) => (
        <PostsErrorFallback
          reset={reset}
          refetch={loadQuery}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
