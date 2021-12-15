import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function HorizontalNavigationLeft ({ children }: Props): JSX.Element {
  return (
    <Flex
      display={{
        base: 'none',
        md: 'flex'
      }}
      left={0}
      ml={3}
    >
      {children}
    </Flex>
  )
}
