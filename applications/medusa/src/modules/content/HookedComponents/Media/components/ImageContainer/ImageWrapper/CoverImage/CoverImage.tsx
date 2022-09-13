import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { COVER_PROPS } from '../../../../constants'

interface Props {
  children: ReactNode
}

export default function CoverImage (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex
      {...COVER_PROPS}
      borderRadius='inherit'
      position='relative'
    >
      {children}
    </Flex>
  )
}
