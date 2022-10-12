import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function FeaturesClubSupporter (): JSX.Element {
  return (
    <Box>
      <Box px={4} py={20} mt={1} bg='dimmers.200'>
        <Stack spacing={4}>
          <Box>
            <Heading fontSize='4xl' color='gray.00'>
              <Trans>
                From the club
              </Trans>
            </Heading>
            <Heading fontSize='xl' color='gray.200'>
              <Trans>
                Get benefits from the club you support
              </Trans>
            </Heading>
          </Box>

        </Stack>
      </Box>
      <Box px={4} py={20} mt={1} bg='dimmers.200'>
        <Stack spacing={4}>
          <Box>
            <Heading fontSize='4xl' color='gray.00'>
              <Trans>
                From us
              </Trans>
            </Heading>
            <Heading fontSize='xl' color='gray.200'>
              <Trans>
                Receive platform-wide features
              </Trans>
            </Heading>
          </Box>

        </Stack>
      </Box>
    </Box>
  )
}
