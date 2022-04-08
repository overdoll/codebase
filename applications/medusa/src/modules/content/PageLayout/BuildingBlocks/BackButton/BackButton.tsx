import { Box } from '@chakra-ui/react'
import { ArrowButtonLeft } from '@//:assets/icons/navigation'
import { ReactNode } from 'react'
import LinkButton from '../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../index'

interface Props {
  to: string
  children: ReactNode
}

export default function BackButton ({
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
        {children}
      </LinkButton>
    </Box>
  )
}
