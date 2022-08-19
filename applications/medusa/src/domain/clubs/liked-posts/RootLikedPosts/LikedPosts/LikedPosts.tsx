import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { LikedPostsQuery } from '@//:artifacts/LikedPostsQuery.graphql'
import { graphql } from 'react-relay'
import LikedPostsFeed from './LikedPostsFeed/LikedPostsFeed'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'

interface Props {
  query: PreloadedQuery<LikedPostsQuery>
}

const Query = graphql`
  query LikedPostsQuery {
    viewer {
      ...LikedPostsFeedFragment
      ...LikedPostsFeedViewerFragment
      ...AccountInformationBannerFragment
    }
  }
`

export default function LikedPosts (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<LikedPostsQuery>(
    Query,
    props.query
  )

  return (
    <>
      <AccountInformationBanner query={queryData.viewer} />
      <Stack spacing={8}>
        <Stack spacing={2}>
          <HStack spacing={2} justify='space-between'>
            <Heading color='gray.00' fontSize='2xl'>
              <Trans>Your Saved Posts</Trans>
            </Heading>
            <SearchButton />
          </HStack>
        </Stack>
        <LikedPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
      </Stack>
    </>
  )
}
