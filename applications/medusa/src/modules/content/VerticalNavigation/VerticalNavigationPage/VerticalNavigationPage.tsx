import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function VerticalNavigationPage ({ children }: Props): JSX.Element {
  return (
    <Box
      className='page-contents'
      w='100%'
    >
      {children}
    </Box>
  )
}
