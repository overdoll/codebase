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
      w='100%'
      maxW='container.md'
      px={{
        lg: 4,
        md: 2,
        base: 0
      }}
      {...rest}
    >
      {children}
    </Container>
  )
}
