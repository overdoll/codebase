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
        borderRadius='md'
        size='lg'
        aria-label={t`Open Menu`}
        as={IconButton}
        icon={
          <Icon
            icon={NavigationMenuHorizontal}
            w={8}
            fill='gray.300'
            h={8}
          />
        }
      />
      <MenuList minW='300px' boxShadow='lg'>
        {children}
      </MenuList>
    </Menu>
  )
}
