import { Suspense, useContext } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import { useQueryParam } from 'use-query-params'
import type { PostCreatorQuery } from '@//:artifacts/PostCreatorQuery.graphql'
import { STEPS } from '../../constants/constants'
import CommunityGuidelines from '../../../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import Button from '@//:modules/form/Button/Button'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import Icon from '@//:modules/content/Icon/Icon'
import { PauseCircle } from '@//:assets/icons/interface'
import { useHistory } from '@//:modules/routing'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import { Trans } from '@lingui/macro'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { StateContext } from '../../context'
import ClubSelector from '../ClubSelector/ClubSelector'

const Query = graphql`
  query PostCreatorQuery ($reference: String!) {
    post (reference: $reference) {
      __typename
      state
      ...UpdatePostFlowFragment
    }
  }
`

export default function PostCreator (): JSX.Element {
  const [postReference] = useQueryParam<string | null | undefined>('id')

  const state = useContext(StateContext)

  const data = useLazyLoadQuery<PostCreatorQuery>(
    Query,
    { reference: postReference ?? '' }
  )

  const history = useHistory()

  const postData = data.post

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null && (state.step !== STEPS.SUBMIT)) {
    return (
      <Stack spacing={4}>
        <QueryErrorBoundary loadQuery={() => {
        }}
        >
          <Suspense fallback={<SkeletonStack />}>
            <ClubSelector />
          </Suspense>
        </QueryErrorBoundary>
        <CreatePostFlow />
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
    <QueryErrorBoundary loadQuery={() => {
    }}
    >
      <Suspense fallback={<SkeletonStack />}>
        <UpdatePostFlow
          query={data?.post as UpdatePostFlowFragment$key}
        />
      </Suspense>
    </QueryErrorBoundary>
  )
}
