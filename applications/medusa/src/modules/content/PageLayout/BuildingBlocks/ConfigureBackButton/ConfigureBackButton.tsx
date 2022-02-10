import { Box } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ArrowButtonLeft } from '@//:assets/icons/navigation'
import { Icon } from '../../index'
import LinkButton from '../../../ThemeComponents/LinkButton/LinkButton'

interface Props {
  to: string
}

export default function ConfigureBackButton ({ to }: Props): JSX.Element {
  return (
    <Box w='100%' mb={4}>
      <LinkButton
        leftIcon={<Icon icon={ArrowButtonLeft} fill='inherit' w={3} h={3} />}
        w='100%'
        size='md'
        variant='solid'
        to={to}
      >
        <Trans>
          Go back to settings
        </Trans>
      </LinkButton>
    </Box>
  )
}
