/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from '@//:modules/content/PageLayout';
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback';
import { useQueryLoader } from 'react-relay/hooks';
import LockedQuery, { LockedQuery as LockedQueryType } from '@//:artifacts/LockedQuery.graphql';
import Locked from './Locked/Locked';

type Props = {
  prepared: {
    lockedQuery: LockedQueryType
  }
}

export default function RootLocked (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    LockedQuery,
    props.prepared.lockedQuery
  )

  return (
    <>
      <Helmet title='locked' />
      <PageWrapper>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <Locked query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
