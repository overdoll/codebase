import { Flex } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import { CONTAIN_PROPS } from '../../../../constants'

interface Props {
  children: ReactNode
}

const ContainImage = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  const { children } = props

  return (
    <Flex
      ref={forwardRef}
      {...CONTAIN_PROPS}
      justify='center'
      borderRadius='inherit'
    >
      {children}
    </Flex>
  )
})

export default ContainImage
