import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import PublicPost from './PublicPost/PublicPost'
import type { PublicPostQuery as PublicPostQueryType } from '@//:artifacts/PublicPostQuery.graphql'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    query: PreloadedQuery<PublicPostQueryType>
  }
}

export default function RootPublicPost (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicPostQuery,
    props.prepared.query
  )

  const params = useParams()

  return (
    <>
      <Helmet title='view post' />
      <QueryErrorBoundary loadQuery={() => loadQuery({ reference: params?.reference ?? '' })}>
        <Suspense fallback={(
          <PageWrapper>
            <SkeletonPost />
          </PageWrapper>)}
        >
          <PublicPost query={queryRef as PreloadedQuery<PublicPostQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
