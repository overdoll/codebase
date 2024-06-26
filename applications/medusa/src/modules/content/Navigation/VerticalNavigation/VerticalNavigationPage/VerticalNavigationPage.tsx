import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function VerticalNavigationPage ({ children }: Props): JSX.Element {
  return (
    <Box
      ml={{
        base: 0,
        md: '300px',
        '3xl': 0
      }}
      w='100%'
    >
      {children}
    </Box>
  )
}
