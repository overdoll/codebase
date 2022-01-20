import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import ViewPost from './ViewPost/ViewPost'
import type { ViewPostQuery as ViewPostQueryType } from '@//:artifacts/ViewPostQuery.graphql'
import ViewPostQuery from '@//:artifacts/ViewPostQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    query: PreloadedQuery<ViewPostQueryType>
  }
}

export default function ViewPostRoot (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ViewPostQuery,
    props.prepared.query
  )

  const params = useParams()

  return (
    <>
      <Helmet title='view post' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: params?.reference ?? '' })}>
          <Suspense fallback={<SkeletonStack />}>
            <ViewPost query={queryRef as PreloadedQuery<ViewPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
