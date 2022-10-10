import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'
import { graphql, useFragment } from 'react-relay/hooks'
import { QuickPreferencesModalFragment$key } from '@//:artifacts/QuickPreferencesModalFragment.graphql'

interface Props {
  isOpen: boolean
  onClose: () => void
  query: QuickPreferencesModalFragment$key | null
}

const Fragment = graphql`
  fragment QuickPreferencesModalFragment on Account {
    __typename
  }
`

export default function QuickPreferencesModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose,
    query
  } = props

  const data = useFragment(Fragment, query)

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
            {data == null ? (<>join to update preferences</>) : (<>update preferences</>)}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
