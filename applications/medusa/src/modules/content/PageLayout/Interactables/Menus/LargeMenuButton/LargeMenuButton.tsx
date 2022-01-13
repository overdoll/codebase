import { HTMLChakraProps, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Icon } from '../../../../index'
import { ReactNode } from 'react'
import { SettingCog } from '@//:assets/icons/navigation'
import { t } from '@lingui/macro'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function LargeMenuButton ({ children }: Props): JSX.Element {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        borderRadius='lg'
        size='lg'
        aria-label={t`Open Menu`}
        as={IconButton}
        icon={
          <Icon
            icon={SettingCog}
            w={8}
            fill='gray.200'
            h={8}
          />
        }
      />
      <MenuList minW='300px' boxShadow='outline'>
        {children}
      </MenuList>
    </Menu>
  )
}
