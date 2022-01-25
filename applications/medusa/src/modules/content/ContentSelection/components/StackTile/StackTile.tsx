import { Box, BoxProps } from '@chakra-ui/react'

export default function StackTile ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Box
      w='100%'
      h={{
        base: 58,
        md: 90
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
