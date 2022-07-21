import { Box, Flex, FlexProps } from '@chakra-ui/react'
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
      align='center'
      justify='center'
      h='100%'
      w='100%'
      position='relative'
      bg='gray.800'
      {...rest}
    >
      <Box
        overflow='hidden'
        w='100%'
        h='100%'
        position='absolute'
        borderRadius='inherit'
      >
        {backdrop}
      </Box>
      <Box
        borderRadius='inherit'
        w='100%'
        h='100%'
        bg='dimmers.300'
        position='relative'
      >
        {children}
      </Box>
    </Flex>
  )
}
