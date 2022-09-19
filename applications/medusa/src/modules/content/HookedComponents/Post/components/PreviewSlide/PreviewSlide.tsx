import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function PreviewSlide (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex
      direction='column'
      minH={300}
      maxH='70vh'
      borderRadius='lg'
      overflow='hidden'
      w='100%'
      h='100%'
      align='center'
      justify='center'
    >
      {children}
    </Flex>
  )
}
