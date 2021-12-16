import { MenuItem, Text } from '@chakra-ui/react'
import { Icon } from '../../../../index'
import { FunctionComponent } from 'react'

interface Props {
  icon: FunctionComponent<any>
  text: string
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
        pointerEvents='none'
        color={color ?? 'gray.100'}
      >{text}
      </Text>
    </MenuItem>
  )
}
