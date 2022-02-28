import { Box, BoxProps } from '@chakra-ui/react'

export default function StackTile ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Box
      w='100%'
      minH={58}
      {...rest}
    >
      {children}
    </Box>
  )
}
