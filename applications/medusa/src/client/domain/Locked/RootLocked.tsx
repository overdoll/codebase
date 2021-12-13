/**
 * @flow
 */
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import LockedQuery, { LockedQuery as LockedQueryType } from '@//:artifacts/LockedQuery.graphql'
import Locked from './Locked/Locked'

interface Props {
  prepared: {
    lockedQuery: PreloadedQuery<LockedQueryType>
  }
}

export default function RootLocked (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    LockedQuery,
    props.prepared.lockedQuery
  )

  const refetch = (): void => {
    loadQuery({})
  }

  return (
    <>
      <Helmet title='locked' />
      <PageWrapper>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({
              error,
              reset
            }) => (
              <ErrorFallback
                error={error}
                reset={reset}
                refetch={refetch}
              />
            )}
          >
            <Locked query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
