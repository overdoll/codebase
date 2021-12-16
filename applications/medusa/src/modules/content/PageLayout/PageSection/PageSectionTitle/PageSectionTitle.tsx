import { Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageSectionTitle ({ children }: Props): JSX.Element {
  return (
    <Heading
      fontSize='2xl'
      color='gray.00'
    >
      {children}
    </Heading>
  )
}
