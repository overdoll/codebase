import Button from '@//:modules/form/Button/Button'
import Link from '@//:modules/routing/Link'
import { Flex } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  to: string
}

export default function ConfigureBackButton ({ to }: Props): JSX.Element {
  return (
    <Flex justify='center'>
      <Link to={to}>
        <Button mt={8} size='sm' variant='link'>
          <Trans>
            Go back to settings
          </Trans>
        </Button>
      </Link>
    </Flex>
  )
}
