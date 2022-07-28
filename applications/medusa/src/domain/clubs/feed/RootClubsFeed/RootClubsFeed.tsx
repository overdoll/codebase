import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { ClubsFeedQuery as ClubsFeedQueryType } from '@//:artifacts/ClubsFeedQuery.graphql'
import ClubsFeedQuery from '@//:artifacts/ClubsFeedQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import ClubsFeed from './ClubsFeed/ClubsFeed'
import { PageWrapper } from '@//:modules/content/PageLayout'
import FeedRichObject from '../../../../common/rich-objects/clubs/feed/FeedRichObject/FeedRichObject'

interface Props {
  queryRefs: {
    clubsFeedQuery: PreloadedQuery<ClubsFeedQueryType>
  }
}

const RootClubsFeed: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubsFeedQuery,
    props.queryRefs.clubsFeedQuery
  )

  return (
    <>
      <FeedRichObject />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <ClubsFeed query={queryRef as PreloadedQuery<ClubsFeedQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubsFeed
