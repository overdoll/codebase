import { graphql, usePaginationFragment } from 'react-relay'
import { Box, HStack } from '@chakra-ui/react'
import type { ClubTopPostsFragment$key } from '@//:artifacts/ClubTopPostsFragment.graphql'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from '../PostsHorizontalPreview/PostsHorizontalPreview'
import { PublicClubQuery } from '@//:artifacts/PublicClubQuery.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ClubTopPostsFragment$key
}

const Fragment = graphql`
  fragment ClubTopPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubTopPostsPaginationQuery" ) {
    slug
    topPosts: posts(first: $first, after: $after, sortBy: TOP)
    @connection (key: "ClubTopPosts_topPosts") {
      edges {
        __typename
      }
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubTopPosts ({ query }: Props): JSX.Element {
  const {
    data,
    hasNext
  } = usePaginationFragment<PublicClubQuery, any>(
    Fragment,
    query
  )

  const topPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'TOP'
  })

  const link = `/${data.slug as string}/posts?${stringify(topPostsEncodedQuery)}`

  return (
    <Box>
      <PageSectionWrap>
        <HStack justify='space-between'>
          <PageSectionTitle colorScheme='orange'>
            Top Posts
          </PageSectionTitle>
          <LinkButton
            href={link}
            size='sm'
            colorScheme='gray'
            variant='solid'
          >
            <Trans>
              See All
            </Trans>
          </LinkButton>
        </HStack>
      </PageSectionWrap>
      <PostsHorizontalPreview
        hasNext={hasNext}
        href={link}
        query={data.topPosts}
      />
    </Box>
  )
}
