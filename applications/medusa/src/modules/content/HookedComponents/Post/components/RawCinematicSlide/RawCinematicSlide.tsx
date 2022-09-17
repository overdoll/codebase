import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function RawCinematicSlide (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex
      direction='column'
      maxH={{
        base: 700,
        md: 800
      }}
      minH={300}
      w='100%'
      h='100%'
      align='center'
      justify='center'
      bg='gray.800'
    >
      {children}
    </Flex>
  )
}
