/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  Modal,
  useBreakpointValue,
  useDisclosure,
  ModalContent,
  ModalBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  ModalOverlay,
  VStack,
  Flex,
  SimpleGrid,
  Portal,
  Box
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'
import NavigationButton from '@//:modules/content/Navigation/components/NavigationButton/NavigationButton'

type Props = {
  children: Node,
}

export default function NavigationMenu ({ children }: Props): Node {
  const [t] = useTranslation('navigation')

  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure()

  const MenuContents = () => {
    if (display === 'mobile') {
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg='gray.800' boxShadow='none'>
            <ModalBody my={4}>
              <SimpleGrid onClick={onClose} spacing={3}>
                {children}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      )
    }

    return (
      <Popover gutter={32} returnFocusOnClose={false} onClose={onClose} isOpen={isOpen}>
        <PopoverTrigger>
          <Flex position='absolute' />
        </PopoverTrigger>
        <PopoverContent boxShadow='lg' bg='gray.800'>
          <PopoverBody my={1} borderRadius='inherit' bg='inherit'>
            <SimpleGrid onClick={onClose} spacing={3}>
              {children}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      <NavigationButton
        w={{ base: '58px', md: '42px' }}
        onClick={onToggle} active={isOpen} label={t('nav.menu')}
        icon={InterfacePageControllerSettings}
      />
      <MenuContents />
    </>
  )
}
