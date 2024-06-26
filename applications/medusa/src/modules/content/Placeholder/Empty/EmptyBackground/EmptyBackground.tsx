import { Heading, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Icon } from '../../../PageLayout'
import { IconType } from '@//:types/components'

export interface HintProp {
  hint?: string | undefined | null
}

interface Props {
  children: ReactNode
  icon: IconType
}

export default function EmptyBackground ({
  children,
  icon
}: Props): JSX.Element {
  return (
    <Stack spacing={3} px={4} py={8} bg='gray.800' borderRadius='md' justify='center' align='center'>
      <Icon icon={icon} w={7} h={7} fill='gray.200' />
      <Heading color='gray.200' textAlign='center' fontSize='lg'>
        {children}
      </Heading>
    </Stack>
  )
}
