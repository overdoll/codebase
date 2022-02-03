import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function FlowBuilderScrollableContainer ({ children }: Props): JSX.Element {
  return (
    <Box maxH='60vh' overflowY='auto'>
      {children}
    </Box>
  )
}
