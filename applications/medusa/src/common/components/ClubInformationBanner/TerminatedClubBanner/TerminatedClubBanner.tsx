import { Box, Flex } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'

export default function TerminatedClubBanner (): JSX.Element {
  return (
    <Box>
      <Alert
        status='warning'
      >
        <Flex
          w='100%'
          align='center'
          justify='space-between'
        >
          <Flex>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                This club was terminated and will not be visible to the public anymore. Please contact
                hello@overdoll.com if
                this was done in error.
              </Trans>
            </AlertDescription>
          </Flex>
        </Flex>
      </Alert>
    </Box>
  )
}
