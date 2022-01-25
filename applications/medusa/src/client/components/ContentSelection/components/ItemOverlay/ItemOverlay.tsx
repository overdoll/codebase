import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  background: ReactNode
  children: ReactNode
}

export default function ItemOverlay ({
  children,
  background
}: Props): JSX.Element {
  return (
    <Flex
      borderRadius='md'
      overflow='hidden'
      align='center'
      justify='center'
      h='100%'
      w='100%'
      position='relative'
    >
      {background}
      <Flex
        p={2}
        bg='dimmers.400'
        w='100%'
        h='100%'
        position='absolute'
        align='center'
        justify='center'
        direction='column'
        whiteSpace='normal'
        wordBreak='break-word'
      >
        {children}
      </Flex>
    </Flex>
  )
}
