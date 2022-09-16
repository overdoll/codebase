import { Box, Container, ContainerProps } from '@chakra-ui/react'
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
      px={0}
      position='relative'
      {...rest}
    >
      <Box position='absolute' top={0} bottom={0} left={0} right={0}>
        {children}
      </Box>
    </Container>
  )
}
