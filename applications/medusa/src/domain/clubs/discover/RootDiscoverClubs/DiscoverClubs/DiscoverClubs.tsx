import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import { graphql } from 'react-relay'
import { Box, Flex, HStack } from '@chakra-ui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  query: PreloadedQuery<DiscoverClubsQuery>
}

const Query = graphql`
  query DiscoverClubsQuery {
    viewer {
      clubMembershipsCount
      clubMembersPostsFeed(first: 1) {
        edges {
          node {
            __typename
          }
        }
      }
      ...AccountInformationBannerFragment
    }
  }
`

export default function DiscoverClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<DiscoverClubsQuery>(
    Query,
    props.query
  )

  const notLoggedIn = queryData.viewer == null

  const noFeed = !notLoggedIn && (queryData?.viewer?.clubMembershipsCount < 1 || queryData?.viewer?.clubMembersPostsFeed?.edges.length < 1)

  return (
    <>
      <AccountInformationBanner query={queryData.viewer} />
      <Box>
        {notLoggedIn && (
          <Alert
            status='info'
            mb={2}
          >
            <Flex
              w='100%'
              align='center'
              justify='space-between'
            >
              <HStack spacing={0} align='center'>
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    Create an account to join clubs and curate a personalized clubs feed!
                  </Trans>
                </AlertDescription>
              </HStack>
              <LinkButton
                href='/join'
                size='sm'
                colorScheme='teal'
                variant='solid'
              >
                <Trans>
                  Create Account
                </Trans>
              </LinkButton>
            </Flex>
          </Alert>
        )}
        {noFeed
          ? (
            <Alert
              status='info'
              mb={2}
            >
              <HStack spacing={0} align='center'>
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    Start by joining some clubs and we'll create a personalized feed for you!
                  </Trans>
                </AlertDescription>
              </HStack>
            </Alert>
            )
          : (
            <BackButton href='/clubs/feed'>
              <Trans>
                Go to My Feed
              </Trans>
            </BackButton>
            )}
      </Box>
    </>
  )
}
