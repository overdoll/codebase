import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { graphql } from 'react-relay'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import ClubsFeedDiscoverList from './ClubsFeedDiscoverList/ClubsFeedDiscoverList'

interface Props {
  query: PreloadedQuery<ClubsFeedQuery>
}

const Query = graphql`
  query ClubsFeedQuery {
    viewer {
      ...ClubPostsFeedFragment
      ...ClubPostsFeedViewerFragment
      ...AccountInformationBannerFragment
    }
    ...ClubsFeedDiscoverListFragment
  }
`

export default function ClubsFeed (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubsFeedQuery>(
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
              <Trans>Your Clubs Feed</Trans>
            </Heading>
            <SearchButton />
          </HStack>
        </Stack>
        <ClubsFeedDiscoverList query={queryData} />
        <ClubPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
      </Stack>
    </>
  )
}
