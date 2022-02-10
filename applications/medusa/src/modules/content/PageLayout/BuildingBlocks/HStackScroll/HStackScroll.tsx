import { ReactNode } from 'react'
import { HStack } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function HStackScroll ({ children }: Props): JSX.Element {
  return (
    <HStack display='initial' whiteSpace='nowrap' overflowX='auto' spacing={2}>
      {children}
    </HStack>
  )
}
