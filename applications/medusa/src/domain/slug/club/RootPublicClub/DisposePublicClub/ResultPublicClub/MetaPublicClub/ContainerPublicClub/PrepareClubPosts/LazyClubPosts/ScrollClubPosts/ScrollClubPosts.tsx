import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollClubPostsFragment$key } from '@//:artifacts/ScrollClubPostsFragment.graphql'
import type { LazyClubPostsQuery } from '@//:artifacts/LazyClubPostsQuery.graphql'
import { PreviewPost } from '@//:modules/content/HookedComponents/Post'
import ClubEmptyPosts from '../ClubEmptyPosts/ClubEmptyPosts'
import { Flex, Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'

interface Props {
  clubQuery: ScrollClubPostsFragment$key
}

const Fragment = graphql`
  fragment ScrollClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
    seed: {type: String}
  )
  @refetchable(queryName: "ScrollClubPostsFragmentPaginationQuery" ) {
    posts(
      first: $first,
      after: $after,
      sortBy: NEW,
      seed: $seed)
    @connection (key: "ClubPostsPreview_posts") {
      edges {
        node {
          id
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
    slug
    ...ClubEmptyPostsFragment
  }
`

export default function ScrollClubPosts (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const {
    data
  } = usePaginationFragment<LazyClubPostsQuery, any>(
    Fragment,
    clubQuery
  )

  if (data.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={data} />
    )
  }

  return (
    <Stack spacing={16}>
      {data.posts.edges.map((item) => (
        <PreviewPost
          key={item.node.id}
          postQuery={item.node}
        />
      ))}
      <Flex w='100%' justify='center'>
        <LinkButton
          size='lg'
          colorScheme='primary'
          href={{
            pathname: '/[slug]/posts',
            query: {
              slug: data.slug
            }
          }}
        >
          <Trans>
            See all posts
          </Trans>
        </LinkButton>
      </Flex>
    </Stack>
  )
}
