import { WrapItem } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SmallGridItem ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <WrapItem
      h='35%'
      w='30%'
      {...rest}
    >
      {children}
    </WrapItem>
  )
}
