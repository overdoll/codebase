import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function RenderOnMobile ({
  children,
  ...rest
}: Props): JSX.Element {
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
