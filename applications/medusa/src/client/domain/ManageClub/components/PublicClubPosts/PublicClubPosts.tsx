import type { PublicClubPostsFragment$key } from '@//:artifacts/PublicClubPostsFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { Heading, Stack } from '@chakra-ui/react'
import type { ViewClubQuery } from '@//:artifacts/ViewClubQuery.graphql'
import PostGalleryContent from '../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Link } from '@//:modules/routing'

interface Props {
  query: PublicClubPostsFragment$key | null
}

const Fragment = graphql`
  fragment PublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection (key: "PublicClubPosts_posts") {
      edges {
        node {
          id
          reference
          ...PostGalleryContentFragment
        }
      }
    }
  }
`

export default function PublicClubPosts ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ViewClubQuery, any>(
    Fragment,
    query
  )

  return (
    <Stack spacing={4}>
      {data.posts.edges.map((item, index) =>
        <Link key={index} to={`/post/${item.node.reference as string}`}>
          <PostGalleryContent query={item.node} />
        </Link>
      )}
      {hasNext &&
        <ClickableBox
          isLoading={isLoadingNext}
          onClick={() => loadNext(3)}
          h={100}
        >
          <Heading fontSize='lg' textAlign='center' color='gray.00'>
            <Trans>
              Load More Posts
            </Trans>
          </Heading>
        </ClickableBox>}
    </Stack>
  )
}
