import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import LeadsForm from './LeadsForm/LeadsForm'

interface Props {
  isOpen: boolean
  onClose: () => void
  onFinalize: () => void
  methods: any
}

const LeadsFormModal = ({
  isOpen,
  onClose,
  onFinalize,
  methods
}: Props): JSX.Element => {
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
        <LeadsForm methods={methods} onFinalize={onFinalize} />
      </ModalContent>
    </Modal>
  )
}

export default LeadsFormModal
