import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

export default function ErrorContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Container
      w={['base']}
      h='100%'
      centerContent
      {...rest}
    >
      {children}
    </Container>
  )
}
