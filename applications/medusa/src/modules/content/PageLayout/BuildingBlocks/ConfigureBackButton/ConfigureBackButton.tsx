import Button from '../../../../form/Button/Button'
import Link from '../../../../routing/Link'
import { Box } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ArrowButtonLeft } from '@//:assets/icons/navigation'
import { Icon } from '../../index'

interface Props {
  to: string
}

export default function ConfigureBackButton ({ to }: Props): JSX.Element {
  return (
    <Box w='100%' mb={4}>
      <Link to={to}>
        <Button
          leftIcon={<Icon icon={ArrowButtonLeft} fill='inherit' w={3} h={3} />}
          w='100%'
          size='md'
          variant='solid'
        >
          <Trans>
            Go back to settings
          </Trans>
        </Button>
      </Link>
    </Box>
  )
}
