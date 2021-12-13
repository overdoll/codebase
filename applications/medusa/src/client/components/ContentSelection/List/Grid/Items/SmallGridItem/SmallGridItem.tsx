import { WrapItem } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
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
