import { MenuItem, Text } from '@chakra-ui/react'
import { Icon } from '../../../index'
import { FunctionComponent, ReactNode } from 'react'

interface Props {
  icon: FunctionComponent<any>
  text: ReactNode
  onClick?: () => void
  isDisabled?: boolean
  color?: string
}

export default function SmallMenuItem ({
  icon,
  text,
  onClick,
  color,
  isDisabled
}: Props): JSX.Element {
  return (
    <MenuItem
      justify='center'
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <Icon
        pointerEvents='none'
        icon={icon}
        fill={color ?? 'gray.100'}
        w={4}
        h={4}
        mr={2}
      />
      <Text
        color={color ?? 'gray.100'}
      >
        {text}
      </Text>
    </MenuItem>
  )
}