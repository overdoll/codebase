import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

export default function PostSubmitted (): JSX.Element {
  const {
    state,
    reset
  } = useSequenceContext()

  const onRetry = (): void => {
    reset()
  }

  if (state.isInReview === true) {
    return (
      <PostPlaceholder>
        <Stack align='center' spacing={6}>
          <Box>
            <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
              <Trans>
                Submitted For Review
              </Trans>
            </Heading>
            <Text textAlign='center' color='gray.100' fontSize='md'>
              <Trans>
                Thanks for posting! Your submission will be reviewed by our moderation team to ensure it does not
                violate
                any club guidelines. Once approved, it will be visible to the public.
              </Trans>
            </Text>
          </Box>
          <Button
            variant='solid'
            colorScheme='teal'
            size='lg'
            onClick={onRetry}
          >
            <Trans>Post again</Trans>
          </Button>
        </Stack>
      </PostPlaceholder>
    )
  }

  return (
    <PostPlaceholder>
      <Stack spacing={6}>
        <Heading textAlign='center' color='gray.00' fontSize='2xl'>
          <Trans>
            Post Submitted
          </Trans>
        </Heading>
        <Text textAlign='center' color='gray.100' fontSize='md'>
          <Trans>
            Your post is now visible to the public
          </Trans>
        </Text>
      </Stack>
    </PostPlaceholder>
  )
}
