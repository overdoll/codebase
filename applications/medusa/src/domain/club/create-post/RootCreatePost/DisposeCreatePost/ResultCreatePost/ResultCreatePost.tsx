import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultCreatePostQuery } from '@//:artifacts/ResultCreatePostQuery.graphql'
import { graphql } from 'react-relay'
import MetaCreatePost from './MetaCreatePost/MetaCreatePost'
import EmptyClubCreatePost from './EmptyClubCreatePost/EmptyClubCreatePost'
import RestrictedClubCreatePost from './RestrictedClubCreatePost/RestrictedClubCreatePost'
import { MobileContainer, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<ResultCreatePostQuery>
}

const Query = graphql`
  query ResultCreatePostQuery ($reference: String!, $slug: String!) {
    post (reference: $reference) {
      state
      ...MetaCreatePostFragment
    }
    club (slug: $slug) {
      __typename

      suspension {
        __typename
      }
      termination {
        __typename
      }
      viewerIsOwner
      ...RestrictedClubCreatePostFragment
      ...MetaCreatePostClubFragment
    }
    viewer {
      isStaff
      isWorker
    }
  }
`

//

export default function ResultCreatePost (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultCreatePostQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return <EmptyClubCreatePost />
  }

  if (!queryData?.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker)) {
    return <EmptyClubCreatePost />
  }

  if ((queryData.club?.suspension != null || queryData.club?.termination != null)) {
    return <RestrictedClubCreatePost query={queryData?.club} />
  }

  // If the post was already submitted
  if (queryData.post != null && queryData.post?.state !== 'DRAFT' && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker) && !queryData?.club?.viewerIsOwner) {
    return (
      <MobileContainer pt={2}>
        <PostPlaceholder>
          <Stack spacing={6}>
            <Box>
              <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
                <Trans>
                  Post Submitted
                </Trans>
              </Heading>
              <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
                <Trans>
                  This post was already submitted
                </Trans>
              </Text>
            </Box>
          </Stack>
        </PostPlaceholder>
      </MobileContainer>
    )
  }

  return (
    <MetaCreatePost postQuery={queryData?.post} clubQuery={queryData.club} />
  )
}
