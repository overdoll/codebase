import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ContainImage (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex
      maxWidth='100%'
      h='auto'
      objectFit='contain'
    >
      {children}
    </Flex>
  )
}
