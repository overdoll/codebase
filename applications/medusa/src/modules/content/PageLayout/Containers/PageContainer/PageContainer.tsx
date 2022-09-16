import { Box, Center, CenterProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends CenterProps {
  children: ReactNode
}

export default function PageContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Center
      mb={{
        base: 16,
        md: 6
      }}
      {...rest}
    >
      <Box
        w='100%'
        h='100%'
      >
        {children}
      </Box>
    </Center>
  )
}