/**
 * @flow
 */
import type { Node } from 'react'
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex, Modal
} from '@chakra-ui/react'

type Props = {
  supplement?: Node,
  children: Node,
  isOpen: boolean,
  onClose: () => void,
}

export default function InspectModal ({ supplement, children, isOpen, onClose }: Props): Node {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='full'
    >
      <ModalOverlay />
      <ModalContent m={0} borderRadius={0} bg='shadows.500'>
        {supplement && <Flex direction='row'>{supplement}</Flex>}
        <ModalCloseButton size='lg' />
        <ModalBody
          h='100%'
          w='100%'
          display='flex'
          p={0}
          align='center'
          justify='center'
        >
          <Flex w='100%' m={1} align='center' justify='center'>
            {children}
          </Flex>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
