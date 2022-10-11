import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function SupporterFeatureModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose
  } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
      isCentered
      scrollBehavior='inside'
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={4}>
          <>unlock supporter feature</>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
