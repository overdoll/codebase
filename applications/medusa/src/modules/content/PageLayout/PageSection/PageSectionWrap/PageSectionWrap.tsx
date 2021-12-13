import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageSectionWrap ({ children }: Props): JSX.Element {
  return (
    <Box mb={2}>
      {children}
    </Box>
  )
}
