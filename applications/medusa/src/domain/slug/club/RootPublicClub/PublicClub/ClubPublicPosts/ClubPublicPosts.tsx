import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPublicPostsFragment$key } from '@//:artifacts/ClubPublicPostsFragment.graphql'
import { ClubPublicPostsViewerFragment$key } from '@//:artifacts/ClubPublicPostsViewerFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import ClubEmptyPosts from './ClubEmptyPosts/ClubEmptyPosts'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubPostsPreview from './ClubPostsPreview/ClubPostsPreview'

interface Props {
  clubQuery: ClubPublicPostsFragment$key
  viewerQuery: ClubPublicPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubPublicPostsFragment on Club {
    slug
    posts(first: 1) {
      edges {
        node {
          __typename
        }
      }
    }
    supporterPosts: posts(first: 1, supporterOnlyStatus: [FULL, PARTIAL]) {
      edges {
        node {
          __typename
        }
      }
    }
    ...ClubEmptyPostsFragment
    ...ClubPostsPreviewFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubPublicPostsViewerFragment on Account {
    ...ClubPostsPreviewViewerFragment
  }
`

export default function ClubPublicPosts ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const topPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'TOP'
  })

  const link = `/${clubData.slug}/posts?${stringify(topPostsEncodedQuery)}`

  if (clubData.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={clubData} />
    )
  }

  const hasSupporterPosts = clubData.supporterPosts.edges.length > 0

  return (
    <Stack spacing={4}>
      <HStack justify='space-between' spacing={1}>
        <HStack spacing={1}>
          {hasSupporterPosts && (
            <Button>
              <Trans>
                Exclusive
              </Trans>
            </Button>
          )}
          <Button>
            <Trans>
              Top
            </Trans>
          </Button>
          <Button>
            <Trans>
              New
            </Trans>
          </Button>
        </HStack>
        <LinkButton href={link}>
          <Trans>
            All Posts
          </Trans>
        </LinkButton>
      </HStack>
      <ClubPostsPreview query={clubData} viewerQuery={viewerData} />
    </Stack>
  )
}
