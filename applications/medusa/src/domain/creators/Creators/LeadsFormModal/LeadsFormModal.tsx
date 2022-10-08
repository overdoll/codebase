import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import LeadsForm from './LeadsForm/LeadsForm'

const LeadsFormModal = ({
  isOpen,
  onClose,
  isFinalized,
  onFinalize,
  methods
}): JSX.Element => {
  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
        <LeadsForm methods={methods} isFinalized={isFinalized} onFinalize={onFinalize} />
      </ModalContent>
    </Modal>
  )
}

export default LeadsFormModal
