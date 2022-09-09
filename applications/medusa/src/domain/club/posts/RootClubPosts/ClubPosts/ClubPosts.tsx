import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClubPostsQuery } from '@//:artifacts/ClubPostsQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyPosts, NotFoundClub } from '@//:modules/content/Placeholder'
import DraftPost from './DraftPost/DraftPost'
import PublishedPost from './PublishedPost/PublishedPost'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import ReviewPost from './ReviewPost/ReviewPost'
import RejectedPost from './RejectedPost/RejectedPost'
import ArchivedPost from './ArchivedPost/ArchivedPost'
import RemovedPost from './RemovedPost/RemovedPost'
import ClubInformationBanner from '../../../../../common/components/ClubInformationBanner/ClubInformationBanner'
import SubmittedPost from './SubmittedPost/SubmittedPost'

interface Props {
  query: PreloadedQuery<ClubPostsQuery>
}

const Query = graphql`
  query ClubPostsQuery($slug: String!, $state: PostState)  {
    club(slug: $slug) {
      viewerIsOwner
      ...ClubPostsFragment
      ...ClubInformationBannerFragment
    }
    viewer {
      isStaff
      isWorker
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 17}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPaginationQuery" ) {
    posts (first: $first, after: $after, state: $state, sortBy: NEW)
    @connection (key: "ClubPosts_posts") {
      __id
      edges {
        node {
          id
          state
          ...PostPreviewContentFragment
          ...DraftPostFragment
          ...PublishedPostFragment
          ...ReviewPostFragment
          ...RejectedPostFragment
          ...ArchivedPostFragment
          ...RemovedPostFragment
          ...SubmittedPostFragment
        }
      }
    }
  }
`

export default function ClubPosts ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPostsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubPostsQuery, any>(
    Fragment,
    queryData.club
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker)) {
    return <NotFoundClub />
  }

  return (
    <>
      <ClubInformationBanner query={queryData.club} />
      <EmptyBoundary
        fallback={<EmptyPosts />}
        condition={data?.posts?.edges.length < 1}
      >
        <GridWrap>
          {data?.posts?.edges.map((item, index) => {
            switch (item.node.state) {
              case 'DRAFT':
                return (
                  <DraftPost connectionId={data.posts.__id} key={item.node.id} query={item.node} />
                )
              case 'PUBLISHED':
                return (
                  <PublishedPost key={item.node.id} query={item.node} />
                )
              case 'REVIEW':
                return (
                  <ReviewPost key={item.node.id} query={item.node} />
                )
              case 'REJECTED':
                return (
                  <RejectedPost connectionId={data.posts.__id} key={item.node.id} query={item.node} />
                )
              case 'ARCHIVED':
                return (
                  <ArchivedPost key={item.node.id} query={item.node} />
                )
              case 'REMOVED':
                return (
                  <RemovedPost connectionId={data.posts.__id} key={item.node.id} query={item.node} />
                )
              case 'SUBMITTED':
                return (
                  <SubmittedPost key={item.node.id} query={item.node} />
                )
              default:
                return (
                  <GridTile>
                    <PostPreviewContent key={item.node.id} query={data} />
                  </GridTile>
                )
            }
          }
          )}
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(21)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
