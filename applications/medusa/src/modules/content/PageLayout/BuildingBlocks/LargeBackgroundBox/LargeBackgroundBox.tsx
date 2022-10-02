import { Box, BoxProps } from '@chakra-ui/react'

export default function LargeBackgroundBox ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Box
      bg='gray.800'
      p={{
        base: 3,
        md: 4
      }}
      borderRadius='semi'
      {...rest}
    >
      {children}
    </Box>
  )
}
