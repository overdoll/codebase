import { BoxProps, Flex } from '@chakra-ui/react'

export default function StackTile ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Flex
      w='100%'
      minH={10}
      {...rest}
    >
      {children}
    </Flex>
  )
}
