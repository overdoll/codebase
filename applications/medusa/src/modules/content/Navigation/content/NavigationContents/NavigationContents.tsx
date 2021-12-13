import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function NavigationContents ({ children }: Props): JSX.Element {
  return (
    <Flex direction={{
      base: 'column',
      md: 'row'
    }}
    >
      {children}
    </Flex>
  )
}
