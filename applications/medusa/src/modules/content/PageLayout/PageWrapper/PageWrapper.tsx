import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fillPage?: boolean
}

export default function PageWrapper ({
  children,
  fillPage = false
}: Props): JSX.Element {
  return (
    <Center mt={fillPage ? 0 : 8}>
      <Box
        w={fillPage ? ['full', 'lg'] : ['full', 'sm', 'md', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        mb={fillPage ? 0 : 6}
        h='100%'
      >
        {children}
      </Box>
    </Center>
  )
}
