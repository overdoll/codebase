import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { Box, Heading, Text } from '@chakra-ui/react'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { EVENTS, INITIAL_STATE } from '../../../../../constants/constants'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
}

export default function Submit ({
  uppy,
  state,
  dispatch
}: Props): JSX.Element {
  const onRetry = (): void => {
    dispatch({
      type: EVENTS.CLEANUP,
      value: INITIAL_STATE
    })
  }

  if (state.isInReview) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
            <Trans>
              Submitted For Review
            </Trans>
          </Heading>
          <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
            <Trans>
              Your post will be reviewed to ensure it falls within our community guidelines. Once approved, it will be
              visible to the public.
            </Trans>
          </Text>
        </Box>
        <Button
          variant='solid'
          colorScheme='primary'
          size='lg'
          onClick={onRetry}
        ><Trans>Post again</Trans>
        </Button>
      </PostPlaceholder>
    )
  }

  return (
    <PostPlaceholder>
      <Box>
        <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
          <Trans>
            Post Submitted
          </Trans>
        </Heading>
        <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
          <Trans>
            Your post is now visible to the public
          </Trans>
        </Text>
      </Box>
      <Button
        variant='solid'
        colorScheme='primary'
        size='lg'
        onClick={onRetry}
      ><Trans>Post again</Trans>
      </Button>
    </PostPlaceholder>
  )
}
