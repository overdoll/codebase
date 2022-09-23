import { graphql, usePaginationFragment } from 'react-relay'
import { Box, HStack } from '@chakra-ui/react'
import type { ClubExclusivePostsFragment$key } from '@//:artifacts/ClubExclusivePostsFragment.graphql'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from './PostsHorizontalPreview/PostsHorizontalPreview'
import { configMap } from '@//:common/components/PageHeader/SearchButton/constants'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'

interface Props {
  query: ClubExclusivePostsFragment$key
}

const Fragment = graphql`
  fragment ClubExclusivePostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubExclusivePostsPaginationQuery" ) {
    slug
    exclusivePosts: posts(first: $first, after: $after, sortBy: NEW, supporterOnlyStatus: [FULL, PARTIAL])
    @connection (key: "ClubExclusivePosts_exclusivePosts") {
      edges {
        __typename
      }
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubExclusivePosts ({ query }: Props): JSX.Element {
  const {
    data,
    hasNext
  } = usePaginationFragment<any, any>(
    Fragment,
    query
  )

  const newPostsEncodedQuery = encodeQueryParams(configMap, {
    sort: 'NEW',
    supporter: ['FULL', 'PARTIAL']
  })

  const link = `/${data.slug as string}/posts?${stringify(newPostsEncodedQuery)}`

  return (
    <Box>
      <PageSectionWrap>
        <HStack justify='space-between'>
          <PageSectionTitle colorScheme='orange'>
            Exclusive Posts
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
        query={data.exclusivePosts}
      />
    </Box>
  )
}
