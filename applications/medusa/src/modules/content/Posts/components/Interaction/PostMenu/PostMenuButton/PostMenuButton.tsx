import { MenuItem, Text } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import { Icon } from '../../../../../index'

interface Props {
  icon: FunctionComponent<any>
  text: ReactNode
  onClick?: () => void
  isDisabled?: boolean
  color?: string
}

export default function PostMenuButton ({
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
        w={6}
        h={6}
        mr={3}
      />
      <Text
        color={color ?? 'gray.100'}
        fontSize='xl'
      >
        {text}
      </Text>
    </MenuItem>
  )
}
