import { useContext } from 'react'
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import type { PostCreatorQuery } from '@//:artifacts/PostCreatorQuery.graphql'
import { STEPS } from '../../constants/constants'
import CommunityGuidelines from '../../../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import Button from '@//:modules/form/Button/Button'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import Icon from '@//:modules/content/Icon/Icon'
import { PauseCircle } from '@//:assets/icons/interface'
import { useHistory } from '@//:modules/routing'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import { Trans } from '@lingui/macro'
import { StateContext } from '../../context'

interface Props {
  query: PreloadedQuery<PostCreatorQuery>
}

const Query = graphql`
  query PostCreatorQuery ($reference: String!, $slug: String!) {
    post (reference: $reference) {
      __typename
      state
      ...UpdatePostFlowFragment
    }
    club (slug: $slug) {
      id
    }
  }
`

export default function PostCreator ({ query }: Props): JSX.Element {
  const data = usePreloadedQuery<PostCreatorQuery>(
    Query,
    query
  )

  const state = useContext(StateContext)

  const history = useHistory()

  const postData = data.post

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null && (state.step !== STEPS.SUBMIT)) {
    return (
      <Stack spacing={4}>
        <CreatePostFlow clubId={data?.club?.id} />
        <Box>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              As a reminder of the guidelines...
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
            <Trans>Upstanding netizens shall read all the rules before posting</Trans>
          </Text>
          <CommunityGuidelines size='md' />
        </Box>
      </Stack>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT' && state.step !== STEPS.SUBMIT) {
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
          ><Trans>
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
      query={data?.post as UpdatePostFlowFragment$key}
    />
  )
}
