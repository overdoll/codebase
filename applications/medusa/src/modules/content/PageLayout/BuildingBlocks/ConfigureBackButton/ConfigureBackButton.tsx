import { Box } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ArrowButtonLeft } from '@//:assets/icons/navigation'
import { Icon } from '../../index'
import LinkButton from '../../../ThemeComponents/LinkButton/LinkButton'
import { ReactNode } from 'react'

interface Props {
  to: string
  children?: ReactNode
}

export default function ConfigureBackButton ({
  to,
  children
}: Props): JSX.Element {
  return (
    <Box w='100%' mb={4}>
      <LinkButton
        leftIcon={<Icon icon={ArrowButtonLeft} fill='inherit' w={3} h={3} />}
        w='100%'
        size='md'
        variant='solid'
        to={to}
      >
        {children == null
          ? (
            <Trans>
              Go back to settings
            </Trans>)
          : children}
      </LinkButton>
    </Box>
  )
}
