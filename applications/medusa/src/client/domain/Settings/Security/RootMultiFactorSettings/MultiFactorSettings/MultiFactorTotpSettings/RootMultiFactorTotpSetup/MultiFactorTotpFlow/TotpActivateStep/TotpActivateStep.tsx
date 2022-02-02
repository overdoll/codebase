import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import TotpActivationForm from './TotpActivationForm/TotpActivationForm'

interface Props {
  totpId: string | undefined
  onSuccess: () => void
}

export default function TotpActivateStep ({
  totpId,
  onSuccess
}: Props): JSX.Element {
  return (
    <Box>
      <Heading fontSize='lg' color='gray.00'>
        <Trans>
          Enter the code
        </Trans>
      </Heading>
      <Stack spacing={2}>
        <Text color='gray.100' fontSize='sm'>
          <Trans>
            Enter the 6-digit verification code that the authenticator app generated.
          </Trans>
        </Text>
        {totpId != null &&
          <TotpActivationForm
            id={totpId}
            setIsSuccessful={onSuccess}
          />}
      </Stack>
    </Box>
  )
}
