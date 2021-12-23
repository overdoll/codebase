import { HTMLChakraProps, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Icon } from '../../../../index'
import { ReactNode } from 'react'
import { SettingCog } from '@//:assets/icons/navigation'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function SmallMenuButton ({ children }: Props): JSX.Element {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        borderRadius='md'
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
      <MenuList boxShadow='outline'>
        {children}
      </MenuList>
    </Menu>
  )
}
