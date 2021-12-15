import { ReactNode } from 'react'
import HorizontalNavigationMenuButton from './HorizontalNavigationMenuButton/HorizontalNavigationMenuButton'
import { Menu, MenuList, Portal, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import QuickAccess from '../../../../client/domain/Root/UniversalNavigator/QuickAccessMenu/QuickAccess/QuickAccess'

interface ButtonProps {
  onToggle: () => void
  isOpen: boolean
}

interface Props {
  children: ReactNode
  button: (p: ButtonProps) => JSX.Element
}

const HorizontalNavigationMenu = ({
  children,
  button
}: Props): JSX.Element => {
  const {
    isOpen: isOpenMenu,
    onToggle: onToggleMenu,
    onClose: onCloseMenu
  } = useDisclosure()

  return (
    <Menu
      flip
      preventOverflow
      isOpen={isOpenMenu}
      onClose={onCloseMenu}
    >
      {button({
        isOpen: isOpenMenu,
        onToggle: onToggleMenu
      })}
      <Portal>
        <MenuList
          minW='300px'
          m={0}
          p={0}
          boxShadow='lg'
        >
          <SimpleGrid
            p={4}
            onClick={onCloseMenu}
            spacing={3}
          >
            <QuickAccess queryRef={props.queryRef} />
          </SimpleGrid>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default Object.assign(HorizontalNavigationMenu, {
  Button: HorizontalNavigationMenuButton
})
