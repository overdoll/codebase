/**
 * @flow
 */
import type { Node } from 'react'
import Upload from './Upload/Upload'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'

type Props = {};

export default function CreatePost (props: Props): Node {
  const loadQuery = () => {
  }
  return (
    <Suspense fallback={<SkeletonStack />}>
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
        )}
      >
        <Upload />
      </ErrorBoundary>
    </Suspense>
  )
}
