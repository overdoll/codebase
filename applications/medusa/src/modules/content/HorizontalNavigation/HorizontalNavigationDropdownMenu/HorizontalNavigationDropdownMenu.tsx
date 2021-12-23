import { FunctionComponent, ReactNode } from 'react'
import HorizontalNavigationDropdownMenuButton
  from './HorizontalNavigationDropdownMenuButton/HorizontalNavigationDropdownMenuButton'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { useHistoryDisclosure } from '../../../hooks'
import SiteLinkLogo from '../../../../client/domain/Root/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import { ClickableBox, RenderOnDesktop, RenderOnMobile } from '../../PageLayout'
import Icon from '../../Icon/Icon'
import { HorizontalNavigationDropdownMenuContext } from './context'

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
        <HorizontalNavigationDropdownMenuContext.Provider value={{
          onClose: onClose
        }}
        >
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
              h='48px'
              w='48px'
            >
              <Flex w='100%' align='center' justify='center'>
                <Icon
                  icon={icon}
                  w='42px'
                  h='38px'
                  p={2}
                  fill={isOpen ? 'gray.100' : 'gray.300'}
                />
              </Flex>
            </ClickableBox>
          </Box>
          <Modal
            isCentered
            preserveScrollBarGap
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent
              bg='gray.800'
              boxShadow='none'
            >
              <ModalBody my={4}>
                <Stack
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
        </HorizontalNavigationDropdownMenuContext.Provider>
      </RenderOnMobile>
      <RenderOnDesktop>
        <HorizontalNavigationDropdownMenuContext.Provider value={{
          onClose: onCloseMenu
        }}
        >
          <Menu
            isLazy
            flip
            preventOverflow
            isOpen={isOpenMenu}
            onClose={onCloseMenu}
            offset={[-10, 20]}
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
                h='42px'
                w='42px'
                as={MenuButton}
              >
                <Flex w='100%' align='center' justify='center'>
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
                </Flex>
              </ClickableBox>
            </Box>
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
          </Menu>
        </HorizontalNavigationDropdownMenuContext.Provider>
      </RenderOnDesktop>
    </>
  )
}

export default Object.assign(HorizontalNavigationDropdownMenu, {
  Button: HorizontalNavigationDropdownMenuButton
})
