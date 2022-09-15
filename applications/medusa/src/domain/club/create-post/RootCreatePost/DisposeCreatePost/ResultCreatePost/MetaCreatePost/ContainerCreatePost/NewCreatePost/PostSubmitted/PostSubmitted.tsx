import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { CheckCircle } from '@//:assets/icons'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'

export default function PostSubmitted (): JSX.Element {
  const {
    state,
    reset
  } = useSequenceContext()

  const onRetry = (): void => {
    reset()
  }

  if (state.isSubmitted === false) {
    return <></>
  }

  return (
    <LargeBackgroundBox>
      <Stack spacing={0}>
        <HStack justify='space-between'>
          <HStack spacing={2}>
            <Icon icon={CheckCircle} h={4} w={4} fill='gray.200' />
            <Heading fontSize='lg' color='gray.200'>
              <Trans>
                Submitted For Review
              </Trans>
            </Heading>
          </HStack>
          <CloseButton onClick={onRetry} size='sm' />
        </HStack>
        <Text fontSize='sm' color='gray.300'>
          <Trans>
            Thanks for posting! Your post was submitted for review. Once approved, it will be visible to the public.
          </Trans>
        </Text>
      </Stack>
    </LargeBackgroundBox>
  )
}
