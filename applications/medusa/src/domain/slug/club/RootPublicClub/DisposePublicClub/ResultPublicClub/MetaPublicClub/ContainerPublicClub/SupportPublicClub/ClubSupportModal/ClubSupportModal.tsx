import { ReactNode } from 'react'
import { Modal, ModalBody, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react'

interface Props extends Pick<ModalProps, 'isOpen' | 'onClose' | 'initialFocusRef'> {
  children: ReactNode
}

export default function ClubSupportModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose,
    initialFocusRef,
    children
  } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      initialFocusRef={initialFocusRef}
      size={{
        base: 'full',
        md: 'xl'
      }}
      isCentered
      scrollBehavior='inside'
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='10px' bg='dimmers.800' />
      <ModalContent boxShadow='none'>
        <ModalBody p={3}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
