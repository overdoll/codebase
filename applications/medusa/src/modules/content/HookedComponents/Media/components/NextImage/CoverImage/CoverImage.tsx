import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function CoverImage (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex w='100%' h='100%' align='center' justify='center'>
      <Flex
        w='100%'
        h='100%'
        objectFit='cover'
      >
        {children}
      </Flex>
    </Flex>
  )
}
