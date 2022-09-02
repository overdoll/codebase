import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { LikedPostsQuery } from '@//:artifacts/LikedPostsQuery.graphql'
import { graphql } from 'react-relay'
import LikedPostsFeed from './LikedPostsFeed/LikedPostsFeed'
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { BookmarkLarge } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

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
        <EmptyBoundary
          fallback={(
            <LargeBackgroundBox>
              <Stack align='center' spacing={4}>
                <Icon icon={BookmarkLarge} w={8} h={8} fill='primary.400' />
                <Box>
                  <Heading textAlign='center' fontSize='lg' color='gray.00'>
                    <Trans>
                      Your saved posts will show up here
                    </Trans>
                  </Heading>
                  <Text textAlign='center' fontSize='md' color='gray.100'>
                    <Trans>
                      Join overdoll to save posts and let the artist know you like their content
                    </Trans>
                  </Text>
                </Box>
                <LinkButton size='lg' colorScheme='primary' w='100%' href='/join'>
                  <Trans>
                    Join
                  </Trans>
                </LinkButton>
              </Stack>
            </LargeBackgroundBox>
          )}
          condition={queryData?.viewer == null}
        >
          <LikedPostsFeed
            query={queryData.viewer}
            viewerQuery={queryData.viewer}
          />
        </EmptyBoundary>

      </Stack>
    </>
  )
}
