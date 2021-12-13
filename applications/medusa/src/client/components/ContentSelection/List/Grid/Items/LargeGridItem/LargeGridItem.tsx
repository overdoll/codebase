import { WrapItem } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
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
