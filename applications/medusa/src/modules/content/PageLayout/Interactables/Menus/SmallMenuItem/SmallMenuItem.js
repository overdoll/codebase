/**
 * @flow
 */
import type { Node } from 'react'
import { MenuItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'

type Props = {
  icon: () => void,
  text: string,
  onClick?: () => void,
  isDisabled?: () => void,
  color?: string,
};

export default function SmallMenuItem ({ icon, text, onClick, color, isDisabled }: Props): Node {
  return (
    <MenuItem
      justify='center'
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <Icon pointerEvents='none' icon={icon} fill={color || 'gray.100'} w={4} h={4} mr={2} />
      <Text pointerEvents='none' color={color || 'gray.100'}>{text}</Text>
    </MenuItem>
  )
}
