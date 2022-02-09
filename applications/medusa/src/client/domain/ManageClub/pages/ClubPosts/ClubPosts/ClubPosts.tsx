import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClubPostsQuery } from '@//:artifacts/ClubPostsQuery.graphql'
import { ClickableTile, GridTile, GridWrap, LoadMoreGridTile } from '../../../../../../modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import PostPreviewContent
  from '../../../../../../modules/content/Posts/components/Content/PostPreviewContent/PostPreviewContent'
import { Link } from '@//:modules/routing'
import generatePath from '@//:modules/routing/generatePath'
import { useParams } from '@//:modules/routing/useParams'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { NotFoundClub } from '@//:modules/content/Placeholder'

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
          reference
          state
          ...PostPreviewContentFragment
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

  const match = useParams()

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
        const draftPostPath = (): string => {
          if (match?.slug == null) return ''

          return generatePath('/club/:slug/:entity', {
            slug: match?.slug,
            entity: 'create-post'
          })
        }

        switch (item.node.state) {
          case 'DRAFT':
            return (
              <GridTile key={index}>
                <Link to={`${draftPostPath()}?post=${item.node.reference as string}`}>
                  {({ isPending }) => (
                    <ClickableTile isPending={isPending}>
                      <PostPreviewContent query={item.node} />
                    </ClickableTile>
                  )}
                </Link>
              </GridTile>
            )
          case 'PUBLISHED':
            return (
              <GridTile key={index}>
                <Link to={`/p/${item.node.reference as string}`}>
                  {({ isPending }) => (
                    <ClickableTile isPending={isPending}>
                      <PostPreviewContent query={item.node} />
                    </ClickableTile>
                  )}
                </Link>
              </GridTile>
            )
          default:
            return (
              <GridTile key={index}>
                <PostPreviewContent query={item.node} />
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
