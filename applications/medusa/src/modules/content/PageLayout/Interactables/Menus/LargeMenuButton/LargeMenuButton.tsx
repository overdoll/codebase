import { HTMLChakraProps, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Icon } from '../../../../index'
import { ReactNode } from 'react'
import { NavigationMenuHorizontal } from '@//:assets/icons/navigation'
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
            icon={NavigationMenuHorizontal}
            w={8}
            currentColor='gray.500'
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
