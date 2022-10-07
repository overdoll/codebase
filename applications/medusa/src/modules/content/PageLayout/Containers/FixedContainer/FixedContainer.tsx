import { Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function FixedContainer (props: Props): JSX.Element {
  const { children } = props

  return (
    <Center px={1} mt={4} position='fixed' w='100%'>
      <Center
        w='100%'
        maxW='container.xs'
      >
        {children}
      </Center>
    </Center>
  )
}
