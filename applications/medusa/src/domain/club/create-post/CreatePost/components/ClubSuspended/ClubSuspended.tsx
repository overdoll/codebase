import { Box, Heading, Text } from '@chakra-ui/react'
import { PostPlaceholder } from '@//:modules/content/PageLayout'

import { Trans } from '@lingui/macro'

export default function ClubSuspended (): JSX.Element {
  return (
    <PostPlaceholder>
      <Box>
        <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
          <Trans>
            Club Suspended
          </Trans>
        </Heading>
        <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
          <Trans>
            You cannot post until your club is no longer suspended
          </Trans>
        </Text>
      </Box>
    </PostPlaceholder>
  )
}
