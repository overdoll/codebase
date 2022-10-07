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
        maxW='container.2xl'
        top={{
          base: undefined,
          md: '54px'
        }}
        bottom={{
          base: '54px',
          md: undefined
        }}
        h='calc(100% - 54px)'
        position='fixed'
        w='100%'
        minH='300px'
        px={0}
        {...rest}
      >
        {children}
      </Container>
    </Center>
  )
}
