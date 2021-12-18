import { FunctionComponent, ReactNode } from 'react'
import HorizontalNavigationDropdownMenuButton
  from './HorizontalNavigationDropdownMenuButton/HorizontalNavigationDropdownMenuButton'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Portal,
  SimpleGrid,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { useHistoryDisclosure } from '../../../hooks'
import SiteLinkLogo from '../../../../client/domain/Root/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import { ClickableBox, RenderOnDesktop, RenderOnMobile } from '../../PageLayout'
import Icon from '../../Icon/Icon'

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
    onToggle,
    onClose
  } = useHistoryDisclosure()

  // hacky way to have 2 different elements
  // on mobile, we use a modal div that pops up for better experience
  // on desktop, we use a desktop menu
  // these are controlled by the display breakpoints
  return (
    <>
      <RenderOnMobile>
        <Box h='100%'>
          <ClickableBox
            p={0}
            onClick={onToggle}
            borderRadius={{
              base: 2,
              md: 10
            }}
            aria-label={label}
            bg={isOpen ? 'gray.500' : 'transparent'}
            h={{
              base: '48px',
              md: '42px'
            }}
          >
            <Icon
              icon={icon}
              w={{
                base: '58px',
                md: '42px'
              }}
              h='38px'
              p={2}
              fill={isOpen ? 'gray.100' : 'gray.300'}
            />
          </ClickableBox>
        </Box>
        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent
            backdropFilter='blur(5px)'
            bg='gray.800'
            boxShadow='none'
          >
            <ModalBody my={4}>
              <Stack
                onClick={onClose}
                spacing={4}
              >
                <SiteLinkLogo />
                <SimpleGrid spacing={3}>
                  {children}
                </SimpleGrid>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </RenderOnMobile>
      <RenderOnDesktop>
        <Menu
          isLazy
          flip
          preventOverflow
          isOpen={isOpenMenu}
          onClose={onCloseMenu}
        >
          <Box h='100%'>
            <ClickableBox
              p={0}
              onClick={onToggleMenu}
              borderRadius={{
                base: 2,
                md: 10
              }}
              aria-label={label}
              bg={isOpenMenu ? 'gray.500' : 'transparent'}
              h={{
                base: '48px',
                md: '42px'
              }}
              as={MenuButton}
            >
              <Icon
                icon={icon}
                w={{
                  base: '58px',
                  md: '42px'
                }}
                h='38px'
                p={2}
                fill={isOpenMenu ? 'gray.100' : 'gray.300'}
              />
            </ClickableBox>
          </Box>
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
                {children}
              </SimpleGrid>
            </MenuList>
          </Portal>
        </Menu>
      </RenderOnDesktop>
    </>
  )
}

export default Object.assign(HorizontalNavigationDropdownMenu, {
  Button: HorizontalNavigationDropdownMenuButton
})
