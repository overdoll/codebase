import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageWrapperGame ({
  children
}: Props): JSX.Element {
  return (
    <Center mt={1}>
      <Box
        position='fixed'
        top={{
          base: 1,
          md: '56px'
        }}
        w={{
          base: 'full',
          sm: 'sm',
          md: '2xl',
          lg: '4xl',
          xl: '6xl',
          '2xl': '8xl'
        }}
        pl={[1, 0]}
        pr={[1, 0]}
        h='100%'
      >
        {children}
      </Box>
    </Center>
  )
}
