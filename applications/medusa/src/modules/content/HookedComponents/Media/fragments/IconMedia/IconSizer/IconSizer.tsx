import { IconSizes } from '../../Media/IconImageMedia/IconImageMedia'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends FlexProps {
  size: IconSizes
  children: ReactNode
}

export default function IconSizer (props: Props): JSX.Element {
  const {
    size = 'sm',
    children,
    ...rest
  } = props

  const sizes = {
    sm: {
      w: 6,
      h: 6
    },
    md: {
      w: 8,
      h: 8
    },
    lg: {
      w: 12,
      h: 12
    },
    xl: {
      w: 16,
      h: 16
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
      bg='gray.700'
      {...rest}
    >
      {children}
    </Flex>
  )
}
