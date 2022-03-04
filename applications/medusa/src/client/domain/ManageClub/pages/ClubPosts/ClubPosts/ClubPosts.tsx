import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClubPostsQuery } from '@//:artifacts/ClubPostsQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile } from '../../../../../../modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import DraftPost from './DraftPost/DraftPost'
import PublishedPost from './PublishedPost/PublishedPost'
import PostPreviewContent
  from '../../../../../../modules/content/Posts/components/PostContent/PostPreviewContent/PostPreviewContent'
import ReviewPost from './ReviewPost/ReviewPost'
import RejectedPost from './RejectedPost/RejectedPost'

interface Props {
  query: PreloadedQuery<ClubPostsQuery>
}

const Query = graphql`
  query ClubPostsQuery($slug: String!, $state: PostState)  {
    club(slug: $slug) {
      __typename
    }
    viewer {
      ...ClubPostsFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 11}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPaginationQuery" ) {
    posts (first: $first, after: $after, state: $state)
    @connection (key: "ClubPosts_posts") {
      edges {
        node {
          state
          ...PostPreviewContentFragment
          ...DraftPostFragment
          ...PublishedPostFragment
          ...ReviewPostFragment
          ...RejectedPostFragment
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
    queryData.viewer
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (data.posts.edges.length < 1) {
    return (
      <SmallBackgroundBox>
        <Trans>
          No posts found
        </Trans>
      </SmallBackgroundBox>
    )
  }

  return (
    <GridWrap>
      {data.posts.edges.map((item, index) => {
        switch (item.node.state) {
          case 'DRAFT':
            return (
              <DraftPost key={index} query={item.node} />
            )
          case 'PUBLISHED':
            return (
              <PublishedPost key={index} query={item.node} />
            )
          case 'REVIEW':
            return (
              <ReviewPost key={index} query={item.node} />
            )
          case 'REJECTED':
            return (
              <RejectedPost key={index} query={item.node} />
            )
          default:
            return (
              <GridTile>
                <PostPreviewContent key={index} query={data} />
              </GridTile>
            )
        }
      }
      )}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(4)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
