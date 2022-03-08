import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import Button from '@//:modules/form/Button/Button'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { PauseCircle } from '@//:assets/icons/interface'
import { useHistory } from '@//:modules/routing'
import type { PostStateFragment$key } from '@//:artifacts/PostStateFragment.graphql'
import type { PostStateClubFragment$key } from '@//:artifacts/PostStateClubFragment.graphql'

import { Trans } from '@lingui/macro'
import PostSubmitted from './PostSubmitted/PostSubmitted'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  postQuery: PostStateFragment$key | null
  clubQuery: PostStateClubFragment$key | null
}

const PostFragment = graphql`
  fragment PostStateFragment on Post {
    __typename
    state
    ...UpdatePostFlowFragment
  }
`

const ClubFragment = graphql`
  fragment PostStateClubFragment on Club {
    __typename
    id
  }
`

export default function PostState ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const { state } = useSequenceContext()

  const history = useHistory()

  if (clubData == null) {
    return <NotFoundClub />
  }

  if (state.isSubmitted === true) {
    return <PostSubmitted />
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null) {
    return (
      <Stack spacing={4}>
        <CreatePostFlow clubId={clubData.id} />
        <Box>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              As a reminder of the guidelines
            </Trans>
          </Heading>
          <Box ml={4}>
            <Text><Trans>Nothing extremely offensive or shocking</Trans></Text>
            <Text><Trans>All characters must be of legal age</Trans></Text>
            <Text><Trans>You own the rights to the content you upload</Trans></Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize='md' color='gray.100'>
            <Trans>Upstanding netizens will read the
              {' '}
              <Link color='teal.400' fontSize='md' isExternal href='https://www.corpodoll.com/club-guidelines/'>
                <Trans>
                  Club Guidelines
                </Trans>
              </Link>
              {' '}
              carefully before posting
            </Trans>
          </Text>
        </Box>
      </Stack>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT') {
    return (
      <PostPlaceholder>
        <Stack spacing={4} align='center'>
          <Icon
            w={12}
            h={12}
            icon={PauseCircle}
            fill='orange.300'
          />
          <Box>
            <Heading color='gray.00' fontSize='4xl'>
              <Trans>
                This post was already submitted
              </Trans>
            </Heading>
          </Box>
          <Button
            colorScheme='orange'
            variant='solid'
            size='lg'
            onClick={() => history.goBack()}
          >
            <Trans>
              Go back
            </Trans>
          </Button>
        </Stack>
      </PostPlaceholder>
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <UpdatePostFlow
      query={postData}
    />
  )
}
