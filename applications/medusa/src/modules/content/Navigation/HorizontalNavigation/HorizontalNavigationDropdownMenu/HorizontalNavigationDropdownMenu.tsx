import { FunctionComponent, ReactNode } from 'react'
import HorizontalNavigationDropdownMenuButton
  from './HorizontalNavigationDropdownMenuButton/HorizontalNavigationDropdownMenuButton'
import { useHistoryDisclosure } from '../../../../hooks'
import { RenderOnDesktop, RenderOnMobile } from '../../../PageLayout'
import { HorizontalNavigationDropdownMenuContext } from './context'
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Portal,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'
import HorizontalNavigation from '../HorizontalNavigation'
import SiteLinkLogo from '../../../../../domain/app/Root/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'

interface Props {
  children: ReactNode
  label: string
  icon: FunctionComponent<any>
}

const HorizontalNavigationDropdownMenu = ({
  children,
  label,
  icon
}: Props): JSX.Element => {
  const {
    isOpen: isOpenMenu,
    onToggle: onToggleMenu,
    onClose: onCloseMenu
  } = useDisclosure()

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure({ hash: 'menu' })

  // hacky way to have 2 different elements
  // on mobile, we use a modal div that pops up for better experience
  // on desktop, we use a desktop menu
  // these are controlled by the display breakpoints
  return (
    <>
      <RenderOnMobile>
        <HorizontalNavigationDropdownMenuContext.Provider value={{
          onClose: onClose
        }}
        >
          <Box h='100%'>
            <HorizontalNavigation.Button
              colorScheme='gray'
              icon={icon}
              isActive={isOpen}
              label={label}
              onClick={onOpen}
            />
          </Box>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset='none'
            preserveScrollBarGap
            scrollBehavior='inside'
            blockScrollOnMount={false}
          >
            <ModalOverlay />
            <ModalContent>
              <SiteLinkLogo />
              <ModalBody
                px={3}
              >
                <HStack isInline spacing={3}>
                  {children}
                </HStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </HorizontalNavigationDropdownMenuContext.Provider>
      </RenderOnMobile>
      <RenderOnDesktop>
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
              <HorizontalNavigation.Button
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
      </RenderOnDesktop>
    </>
  )
}

export default Object.assign(HorizontalNavigationDropdownMenu, {
  Button: HorizontalNavigationDropdownMenuButton
})
