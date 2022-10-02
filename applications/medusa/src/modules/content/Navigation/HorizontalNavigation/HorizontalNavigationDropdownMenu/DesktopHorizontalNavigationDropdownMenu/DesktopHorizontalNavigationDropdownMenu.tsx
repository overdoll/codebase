import { ReactNode } from 'react'
import { IconType } from '@//:types/components'
import { Box, Menu, MenuButton, MenuList, Portal, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationButton from '../../HorizontalNavigationButton/HorizontalNavigationButton'

interface Props {
  children: ReactNode
  label: string
  icon: IconType
}

const DesktopHorizontalNavigationDropdownMenu = (props: Props): JSX.Element => {
  const {
    children,
    label,
    icon
  } = props

  const {
    isOpen: isOpenMenu,
    onToggle: onToggleMenu,
    onClose: onCloseMenu
  } = useDisclosure()

  return (
    <HorizontalNavigationDropdownMenuContext.Provider value={{
      onClose: onCloseMenu
    }}
    >
      <Menu
        flip
        preventOverflow
        isOpen={isOpenMenu}
        isLazy
        onClose={onCloseMenu}
        offset={[-10, 20]}
      >
        <MenuButton
          pointerEvents='none'
          as={Box}
        >
          <HorizontalNavigationButton
            colorScheme='gray'
            icon={icon}
            isActive={isOpenMenu}
            label={label}
            onClick={onToggleMenu}
          />
        </MenuButton>
        <Portal>
          <MenuList
            minW='300px'
            m={0}
            p={0}
            boxShadow='outline'
          >
            <SimpleGrid
              p={4}
              spacing={3}
            >
              {children}
            </SimpleGrid>
          </MenuList>
        </Portal>
      </Menu>
    </HorizontalNavigationDropdownMenuContext.Provider>
  )
}

export default DesktopHorizontalNavigationDropdownMenu
