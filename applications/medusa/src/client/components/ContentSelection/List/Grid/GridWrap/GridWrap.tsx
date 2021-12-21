import { HTMLChakraProps, Wrap } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function GridWrap ({ children }: Props): JSX.Element {
  return (
    <Wrap justify='center'>
      {children}
    </Wrap>
  )
}
