import { Box, BoxProps } from '@chakra-ui/react'

export default function SmallBackgroundBox ({
  children,
  ...rest
}: BoxProps): JSX.Element {
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
