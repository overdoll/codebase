import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

export default function MobileContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Container
      w={['full', 'base']}
      maxW='container.md'
      px={{
        md: 4,
        base: 2
      }}
      {...rest}
    >
      {children}
    </Container>
  )
}
