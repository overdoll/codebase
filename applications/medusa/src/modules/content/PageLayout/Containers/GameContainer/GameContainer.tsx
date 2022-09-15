import { Center, Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

export default function GameContainer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Center w='100%' h='100%'>
      <Container
        w='100%'
        maxW='container.2xl'
        h={{
          base: '100%',
          md: 'calc(100% - 54px)'
        }}
        py={1}
        position='fixed'
        bottom={0}
        minH='300px'
        px={0}
        {...rest}
      >
        {children}
      </Container>
    </Center>
  )
}
