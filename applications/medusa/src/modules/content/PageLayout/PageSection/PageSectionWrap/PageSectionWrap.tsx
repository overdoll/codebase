import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function PageSectionWrap ({ children }: Props): JSX.Element {
  return (
    <Box mb={2}>
      {children}
    </Box>
  )
}
