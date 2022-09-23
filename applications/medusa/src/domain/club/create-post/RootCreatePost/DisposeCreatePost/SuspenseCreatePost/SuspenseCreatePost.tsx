import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { MobileContainer, PostPlaceholder } from '@//:modules/content/PageLayout'

export default function SuspenseCreatePost (): JSX.Element {
  return (
    <MobileContainer pt={2}>
      <PostPlaceholder>
        <Stack align='center' spacing={6}>
          <Spinner thickness='6px' w={12} h={12} color='teal.300' />
          <Heading fontSize='4xl' color='gray.00'><Trans>Opening Post</Trans></Heading>
        </Stack>
      </PostPlaceholder>
    </MobileContainer>
  )
}
