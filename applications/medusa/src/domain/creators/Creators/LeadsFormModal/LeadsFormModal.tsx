import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { graphql } from 'react-relay/hooks'
import LeadsForm from './LeadsForm/LeadsForm'

const Mutation = graphql`
  mutation LeadsFormMutation ($input: NewC!) {
    updateClubName(input: $input) {
      club {
        id
        name
      }
    }
  }
`

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
