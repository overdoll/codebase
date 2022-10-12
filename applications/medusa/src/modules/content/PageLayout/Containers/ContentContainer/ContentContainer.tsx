import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

export default function ContentContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Container
      w='100%'
      maxW='container.lg'
      px={{
        md: 0,
        base: 1
      }}
      {...rest}
    >
      {children}
    </Container>
  )
}
