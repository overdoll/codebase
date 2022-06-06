import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends FlexProps {
  backdrop: ReactNode
  children: ReactNode
}

export default function TileOverlay ({
  children,
  backdrop,
  ...rest
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
      {...rest}
    >
      {backdrop}
      <Flex
        p={2}
        bg='dimmers.300'
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
