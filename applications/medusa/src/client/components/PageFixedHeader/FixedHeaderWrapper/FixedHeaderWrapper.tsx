import { Box, Center, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends FlexProps {
  children: ReactNode
}

export default function FixedHeaderWrapper ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Center w='100%'>
      <Box
        w={['full', 'lg']}
      >
        {children}
      </Box>
    </Center>
  )
}
