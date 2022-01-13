import { HTMLChakraProps, WrapItem } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function SquareGridItem ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <WrapItem
      h={130}
      w={130}
      {...rest}
    >
      {children}
    </WrapItem>
  )
}
