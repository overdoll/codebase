import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'

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
          <Box position='relative'>
            <Flex h={16} align='center' position='absolute' top={0} right={0}>
              <CloseButton borderRadius='lg' variant='solid' onClick={onClose} size='md' />
            </Flex>
            <>unlock supporter feature</>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
