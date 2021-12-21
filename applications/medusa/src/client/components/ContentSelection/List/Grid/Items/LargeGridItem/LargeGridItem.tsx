import { HTMLChakraProps, WrapItem } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function LargeGridItem ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <WrapItem
      h='45%'
      w='45%'
      {...rest}
    >
      {children}
    </WrapItem>
  )
}
