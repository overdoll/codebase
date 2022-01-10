import { ReactNode } from 'react'
import { Box, Center } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function PageContents ({ children }: Props): JSX.Element {
  return (
    <Box
      left={0}
      right={0}
      top={0}
      bottom={0}
      position='absolute'
      overflowY='auto'
      overflowX='hidden'
    >
      <Center mt={8}>
        <Box
          w={['full', 'xl']}
          pl={[1, 0]}
          pr={[1, 0]}
          mb={6}
        >
          {children}
        </Box>
      </Center>
    </Box>
  )
}
