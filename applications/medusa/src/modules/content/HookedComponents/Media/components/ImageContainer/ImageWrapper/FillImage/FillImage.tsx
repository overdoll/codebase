import { Flex } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FillImage = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  const { children } = props

  return (
    <Flex
      ref={forwardRef}
      width='100%'
      h='100%'
      objectFit='contain'
    >
      {children}
    </Flex>
  )
})

export default FillImage
