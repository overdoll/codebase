import { Heading } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
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
