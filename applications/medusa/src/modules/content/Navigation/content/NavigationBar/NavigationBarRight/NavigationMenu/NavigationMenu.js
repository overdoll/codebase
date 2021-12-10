/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Menu,
  MenuButton,
  MenuList,
  Modal,
  useBreakpointValue,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalOverlay,
  SimpleGrid,
  Portal
} from '@chakra-ui/react'
import { PageControllerSettings } from '../../../../../../../assets/icons/navigation'
import NavigationButton from '@//:modules/content/Navigation/components/NavigationButton/NavigationButton'
import { useHistoryDisclosure } from '@//:modules/utilities/hooks'

type Props = {
  children: Node,
}

export default function NavigationMenu ({ children }: Props): Node {
  const [t] = useTranslation('navigation')

  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  const { isOpen, onToggle, onClose } = useHistoryDisclosure()

  const { isOpen: isOpenMenu, onToggle: onToggleMenu, onClose: onCloseMenu } = useDisclosure()

  if (display === 'mobile') {
    return (
      <>
        <NavigationButton
          w={{ base: '58px', md: '42px' }}
          onClick={onToggle} active={isOpen} label={t('nav.menu')}
          icon={PageControllerSettings}
        />
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backdropFilter='blur(5px)' bg='gray.800' boxShadow='none'>
            <ModalBody my={4}>
              <SimpleGrid onClick={onClose} spacing={3}>
                {children}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Menu flip preventOverflow isOpen={isOpenMenu} onClose={onCloseMenu}>
        <NavigationButton
          w={{ base: '58px', md: '42px' }}
          onClick={onToggleMenu} active={isOpenMenu} label={t('nav.menu')}
          icon={PageControllerSettings}
          as={MenuButton}
        />
        <Portal>
          <MenuList minW='200px' m={0} p={0} boxShadow='lg'>
            <SimpleGrid p={2} onClick={onCloseMenu} spacing={3}>
              {children}
            </SimpleGrid>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}
