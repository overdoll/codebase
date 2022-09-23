import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultLikedPostsQuery } from '@//:artifacts/ResultLikedPostsQuery.graphql'
import { graphql } from 'react-relay'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { BookmarkLarge } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import MetaLikedPosts from './MetaLikedPosts/MetaLikedPosts'

interface Props {
  query: PreloadedQuery<ResultLikedPostsQuery>
}

const Query = graphql`
  query ResultLikedPostsQuery {
    viewer {
      ...MetaLikedPostsViewerFragment
    }
  }
`

export default function ResultLikedPosts (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultLikedPostsQuery>(
    Query,
    query
  )

  if (queryData.viewer == null) {
    return (
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
    )
  }

  return (
    <MetaLikedPosts viewerQuery={queryData.viewer} />
  )
}
