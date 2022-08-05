import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import ContactButton from '../../../../../../common/components/Contact/ContactButton'

export default function DisabledClubCharacters (): JSX.Element {
  return (
    <PostPlaceholder>
      <Stack spacing={6}>
        <Box>
          <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
            <Trans>
              Custom Characters Disabled
            </Trans>
          </Heading>
          <Stack spacing={2}>
            <Text textAlign='center' color='gray.100' fontSize='md'>
              <Trans>
                Creating custom characters is currently not enabled for your club. Please contact us if you would like
                it to be enabled.
              </Trans>
            </Text>
            <ContactButton />
          </Stack>
        </Box>
      </Stack>
    </PostPlaceholder>
  )
}
