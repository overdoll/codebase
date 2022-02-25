import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageInfiniteScrollWrapper ({ children }: Props): JSX.Element {
  return (
    <Center>
      <Box
        w={['full', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        h='100%'
      >
        {children}
      </Box>
    </Center>
  )
}
