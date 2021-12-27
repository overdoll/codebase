import { Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

interface Props {
}

export default function UnlockAccountForm ({}: Props): JSX.Element | null {
  return (
    <form>
      <Stack>
        <Button colorScheme='green' size='lg'>
          <Trans>
            Unlock Account
          </Trans>
        </Button>
      </Stack>
    </form>
  )
}
