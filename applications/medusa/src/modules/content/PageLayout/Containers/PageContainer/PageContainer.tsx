import { Box, Center, CenterProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends CenterProps {
  children: ReactNode
}

export default function PageContainer ({
  children,
  bg,
  ...rest
}: Props): JSX.Element {
  return (
    <Center
      pb={{
        base: 16,
        md: 6
      }}
      bg={bg}
      {...rest}
    >
      <Box
        w='100%'
        h='100%'
        bg={bg}
      >
        {children}
      </Box>
    </Center>
  )
}
