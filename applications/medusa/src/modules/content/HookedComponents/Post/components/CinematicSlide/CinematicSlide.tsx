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
      maxH='calc(100vh - 169px)'
      h='100%'
      w='100%'
      align='center'
      justify='center'
    >
      {children}
    </Flex>
  )
}
