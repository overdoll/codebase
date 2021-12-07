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
  ModalBody
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'
import Button from '@//:modules/form/Button'

type Props = {
  children: Node,
}

export default function NavigationMenu ({ children }: Props): Node {
  const [t] = useTranslation('navigation')

  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  const { isOpen, onToggle, onClose } = useDisclosure()

  const onCheckToggle = () => {
    if (display === 'mobile') {
      onToggle()
    }
  }

  if (display === 'mobile') {
    return (
      <>
        <Button onClick={onToggle}>
          123123
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Menu autoSelect={false}>
        {({ isOpen }) => (
          <>
            <Tooltip hasArrow label={t('nav.menu')} placement='bottom'>
              <MenuButton
                bg={isOpen ? 'gray.500' : 'transparent'}
                borderRadius={{ base: 2, md: 10 }}
                h={{ base: '48px', md: '42px' }} w={{ base: '58px', md: '42px' }} as={IconButton}
                aria-label={t('nav.menu')}
                onClick={onCheckToggle}
                icon={
                  <Icon
                    icon={isOpen ? InterfaceArrowsShrink3 : InterfacePageControllerSettings}
                    p={2}
                    w='38px' h='38px'
                    fill={isOpen ? 'gray.100' : 'gray.300'}
                  />
                }
              />
            </Tooltip>
            {display === 'desktop' &&
              <MenuList minW='300px' boxShadow='lg'>
                {children}
              </MenuList>}
          </>
        )}
      </Menu>
      {display === 'mobile' &&
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>}
    </>
  )
}
