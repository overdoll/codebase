import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

export default function CinematicContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Container
      w='100%'
      h='56.25vw'
      maxW='100%'
      maxH='calc(100vh - 169px)'
      minH='480px'
      bg='#000'
      px={0}
      {...rest}
    >
      {children}
    </Container>
  )
}
