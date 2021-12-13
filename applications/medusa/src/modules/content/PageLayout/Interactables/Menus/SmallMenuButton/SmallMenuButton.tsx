import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { SettingCog } from '@//:assets/icons/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SmallMenuButton ({ children }: Props): JSX.Element {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        size='xs'
        as={IconButton}
        icon={
          <Icon
            icon={SettingCog}
            w={4}
            fill='gray.300'
            h={4}
          />
        }
      />
      <MenuList boxShadow='lg'>
        {children}
      </MenuList>
    </Menu>
  )
}
