import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function PageSectionWrap ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box mb={2} {...rest}>
      {children}
    </Box>
  )
}
