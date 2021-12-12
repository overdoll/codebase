import { Text } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
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
