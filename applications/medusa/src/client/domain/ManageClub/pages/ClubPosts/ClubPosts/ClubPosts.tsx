import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClubPostsQuery } from '@//:artifacts/ClubPostsQuery.graphql'
import { GridWrap, LargeGridItem } from '../../../../../components/ContentSelection'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { Heading, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PostPreviewContent from '../../../../../../modules/content/Posts/components/Content/PostPreviewContent/PostPreviewContent'
import { useHistory } from '@//:modules/routing'
import generatePath from '@//:modules/routing/generatePath'
import { useParams } from '@//:modules/routing/useParams'

interface Props {
  query: PreloadedQuery<ClubPostsQuery>
}

const Query = graphql`
  query ClubPostsQuery($slug: String!, $state: PostState)  {
    club(slug: $slug) {
      id
    }
    viewer {
      ...ClubPostsFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
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

  const history = useHistory()

  if (data.posts.edges.length < 1) {
    return (
      <Text>
        <Trans>
          No posts found
        </Trans>
      </Text>
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

        const onClick = (): void => {
          switch (item.node.state) {
            case 'DRAFT':
              history.push(`${draftPostPath()}?post=${item.node.reference as string}`)
              return
            case 'PUBLISHED':
              history.push(`/p/${item.node.reference as string}`)
          }
        }

        switch (item.node.state) {
          case 'DRAFT':
            return (
              <LargeGridItem key={index}>
                <ClickableBox onClick={onClick} borderRadius='md' overflow='hidden' h='100%' p={0}>
                  <PostPreviewContent query={item.node} />
                </ClickableBox>
              </LargeGridItem>
            )
          case 'PUBLISHED':
            return (
              <LargeGridItem key={index}>
                <ClickableBox onClick={onClick} borderRadius='md' overflow='hidden' h='100%' p={0}>
                  <PostPreviewContent query={item.node} />
                </ClickableBox>
              </LargeGridItem>
            )
          default:
            return (
              <LargeGridItem key={index}>
                <PostPreviewContent query={item.node} />
              </LargeGridItem>
            )
        }
      }
      )}
      {hasNext &&
        <LargeGridItem>
          <ClickableBox
            h='100%'
            borderRadius='md'
            isLoading={isLoadingNext}
            onClick={() => loadNext(4)}
          >
            <Heading fontSize='lg' textAlign='center' color='gray.00'>
              <Trans>
                Load More
              </Trans>
            </Heading>
          </ClickableBox>
        </LargeGridItem>}
    </GridWrap>
  )
}