import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { CheckCircle } from '@//:assets/icons'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'

export default function SubmittedCreatePost (): JSX.Element {
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
    <Box mb={4} p={3} borderWidth={2} borderColor='green.300' borderRadius='md'>
      <Stack spacing={1}>
        <Flex justify='space-between'>
          <HStack spacing={3}>
            <Icon icon={CheckCircle} w={5} h={5} fill='green.300' />
            <Heading fontSize='xl' color='green.300'>
              <Trans>
                Submitted For Review
              </Trans>
            </Heading>
          </HStack>
          <CloseButton onClick={onRetry} size='sm' />
        </Flex>
        <Text fontSize='sm' color='gray.00'>
          <Trans>
            Thanks for posting! Your post was submitted for review. Once approved, it will be visible to the public.
          </Trans>
        </Text>
      </Stack>
    </Box>
  )
}
