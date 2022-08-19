import { Box, BoxProps, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

export default function PageWrapper ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Center mt={{
      base: 2,
      md: 6
    }}
    >
      <Box
        w={['full', 'md', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        mb={{
          base: 24,
          md: 6
        }}
        h='100%'
        {...rest}
      >
        {children}
      </Box>
    </Center>
  )
}
