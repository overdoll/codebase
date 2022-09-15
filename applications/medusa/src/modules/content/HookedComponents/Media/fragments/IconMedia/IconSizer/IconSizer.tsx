import { IconSizes } from '../../Media/IconImageMedia/IconImageMedia'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  size: IconSizes
  children: ReactNode
}

export default function IconSizer (props: Props): JSX.Element {
  const {
    size = 'sm',
    children
  } = props

  const sizes = {
    sm: {
      w: 4,
      h: 4
    },
    md: {
      w: 8,
      h: 8
    },
    lg: {
      w: 16,
      h: 16
    },
    xl: {
      w: 24,
      h: 24
    }
  }

  return (
    <Flex
      flexShrink={0}
      align='center'
      justify='center'
      borderRadius='20%'
      overflow='hidden'
      w={sizes[size].w}
      h={sizes[size].h}
    >
      {children}
    </Flex>
  )
}
