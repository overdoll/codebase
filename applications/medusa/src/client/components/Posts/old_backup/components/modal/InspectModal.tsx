import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'

interface Props {
  supplement?: JSX.Element
  children: JSX.Element
  isOpen: boolean
  onClose: () => void
}

export default function InspectModal ({
  supplement,
  children,
  isOpen,
  onClose
}: Props): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='full'
    >
      <ModalOverlay />
      <ModalContent
        position='relative'
        m={0}
        borderRadius={0}
        bg='gray.800'
      >
        {(supplement != null) && (
          <Flex
            right={16}
            position='fixed'
            direction='row'
          >
            {supplement}
          </Flex>
        )}
        <ModalCloseButton
          position='fixed'
          size='lg'
        />
        <ModalBody
          zIndex='hide'
          h='100%'
          w='100%'
          display='flex'
          p={0}
          align='center'
          justify='center'
          position='relative'
        >
          <Flex
            w='100%'
            m={1}
            align='center'
            justify='center'
          >
            {children}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
