import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function SmallBackgroundBox ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      bg='gray.800'
      p={3}
      borderRadius='base'
      {...rest}
    >
      {children}
    </Box>
  )
}
