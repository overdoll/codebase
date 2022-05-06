import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageWrapper ({
  children
}: Props): JSX.Element {
  return (
    <Center mt={{
      base: 2,
      md: 6
    }}
    >
      <Box
        w={['full', 'sm', 'md', 'lg']}
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
