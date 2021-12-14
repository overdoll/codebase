import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageSectionDescription ({ children }: Props): JSX.Element {
  return (
    <Text
      fontSize='sm'
      color='gray.100'
    >
      {children}
    </Text>
  )
}
