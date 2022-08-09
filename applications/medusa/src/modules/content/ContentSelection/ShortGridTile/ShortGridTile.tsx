import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

export default function ShortGridTile ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      position='relative'
      {...rest}
    >
      <Box pt='100%' {...rest} />
      <Box top={0} w='100%' h='100%' position='absolute'>
        {children}
      </Box>
    </Box>
  )
}
