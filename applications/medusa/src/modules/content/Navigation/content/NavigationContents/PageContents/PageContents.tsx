import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageContents ({ children }: Props): JSX.Element {
  return (
    <Box
      className='page-contents'
      w='100%'
    >
      {children}
    </Box>
  )
}
