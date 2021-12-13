import { Wrap } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function GridWrap ({ children }: Props): JSX.Element {
  return (
    <Wrap justify='center'>
      {children}
    </Wrap>
  )
}
