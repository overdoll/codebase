import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function RenderOnDesktop ({ children }: Props): JSX.Element {
  return (
    <Box display={{
      base: 'none',
      md: 'inherit'
    }}
    >
      {children}
    </Box>
  )
}
