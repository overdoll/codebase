import { Box, BoxProps, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageWrapperDesktop ({
  children
}: Props): JSX.Element {
  return (
    <Center mt={6}>
      <Box
        w={['full', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']}
        pl={[1, 0]}
        pr={[1, 0]}
        mb={{
          base: 24,
          md: 6
        }}
        h='100%'
      >
        {children}
      </Box>
    </Center>
  )
}
