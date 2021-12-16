import { Box, BoxProps } from '@chakra-ui/react'

export default function RenderOnMobile ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Box
      display={{
        base: 'inherit',
        md: 'none'
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
