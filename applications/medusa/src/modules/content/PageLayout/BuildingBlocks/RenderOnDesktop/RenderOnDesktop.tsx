import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RenderOnDesktop ({ children }: Props): JSX.Element {
  return (
    <Box
      display={{
        base: 'none',
        md: 'inherit'
      }}
    >
      {children}
    </Box>
  )
}
