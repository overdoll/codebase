import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function CinematicSlide (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex
      direction='column'
      w='100%'
      minH={300}
      h='100%'
      align='center'
      justify='center'
    >
      {children}
    </Flex>
  )
}
