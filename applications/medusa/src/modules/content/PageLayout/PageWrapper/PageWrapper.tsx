import { Box, Center } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function PageWrapper ({ children }: Props): JSX.Element {
  return (
    <Center mt={8}>
      <Box
        w={['full', 'sm', 'md', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        mb={6}
      >
        {children}
      </Box>
    </Center>
  )
}
