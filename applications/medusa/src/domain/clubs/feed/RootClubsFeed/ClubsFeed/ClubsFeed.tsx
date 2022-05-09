import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { graphql } from 'react-relay'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PostSearchButton
  from '../../../../../modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'

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
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>
              Clubs Feed
            </Trans>
          </Heading>
          <HStack spacing={2}>
            <LinkButton size='sm' href='/clubs/discover'>
              <Trans>
                Discover Clubs
              </Trans>
            </LinkButton>
            <PostSearchButton routeTo='/search' />
          </HStack>

        </HStack>
        <ClubPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
      </Stack>
    </>
  )
}
