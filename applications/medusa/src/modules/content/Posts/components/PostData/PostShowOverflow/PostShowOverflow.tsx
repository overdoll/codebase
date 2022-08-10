import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function PostShowOverflow ({ children }: Props): JSX.Element {
  return (
    <Flex
      direction='column'
      minH={300}
      w='100%'
      align='center'
      justify='center'
    >
      {children}
    </Flex>
  )
}
