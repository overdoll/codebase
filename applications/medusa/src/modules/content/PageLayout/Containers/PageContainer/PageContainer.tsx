import { Box, Center, CenterProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends CenterProps {
  children: ReactNode
  pattern?: ReactNode
}

export default function PageContainer (props: Props): JSX.Element {
  const {
    children,
    bg,
    pattern,
    ...rest
  } = props

  return (
    <Center
      pb={{
        base: 16,
        md: 6
      }}
      bg={bg}
      {...rest}
    >
      {pattern}
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
