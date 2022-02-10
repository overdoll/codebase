import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageSectionChildrenWrapper ({
  children
}: Props): JSX.Element {
  return (
    <Box minH={300} mx={1} mt={6} mb={28}>
      {children}
    </Box>
  )
}
