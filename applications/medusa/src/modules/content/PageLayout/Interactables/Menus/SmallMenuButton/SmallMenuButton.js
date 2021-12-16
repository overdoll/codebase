/**
 * @flow
 */
import type { Node } from 'react'
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { SettingCog } from '../../../../../../assets/icons/navigation'

type Props = {
  children: Node
};

export default function SmallMenuButton ({ children, ...rest }: Props): Node {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        size='xs'
        as={IconButton}
        icon={
          <Icon
            icon={SettingCog} w={4}
            fill='gray.300' h={4}
          />
        }
        {...rest}
      />
      <MenuList boxShadow='outline'>
        {children}
      </MenuList>
    </Menu>
  )
}
