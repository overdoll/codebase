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
      w='45%'
      h={[230, 250, 270]}
      {...rest}
    >
      {children}
    </WrapItem>
  )
}
