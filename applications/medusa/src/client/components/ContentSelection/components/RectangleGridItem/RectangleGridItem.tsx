import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function RectangleGridItem ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      position='relative'
      {...rest}
    >
      <Box pt='132%' />
      <Box top={0} w='100%' h='100%' position='absolute'>
        {children}
      </Box>
    </Box>
  )
}
