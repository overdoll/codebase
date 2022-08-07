import { graphql, useFragment } from 'react-relay/hooks'
import type { PostDescriptionModalFragment$key } from '@//:artifacts/PostDescriptionModalFragment.graphql'
import { HStack, Modal, ModalBody, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react'
import UpdatePostDescriptionForm from './UpdatePostDescriptionForm/UpdatePostDescriptionForm'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useRef } from 'react'
import ClubThumbnail from '@//:modules/content/DataDisplay/Club/ClubThumbnail/ClubThumbnail'

interface Props {
  query: PostDescriptionModalFragment$key
  isOpen: boolean
  onClose: () => void
}

const Fragment = graphql`
  fragment PostDescriptionModalFragment on Post {
    club {
      ...ClubThumbnailFragment
    }
    ...UpdatePostDescriptionFormFragment
  }
`

export default function PostDescriptionModal ({
  query,
  onClose,
  isOpen
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef(null)

  return (
    <Modal
      isCentered
      preserveScrollBarGap
      onClose={onClose}
      isOpen={isOpen}
      initialFocusRef={ref}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody my={3}>
          <Stack spacing={4}>
            <HStack justify='space-between'>
              <ClubThumbnail
                h={14}
                w={14}
                query={data.club}
              />
              <CloseButton bg='gray.800' size='lg' onClick={onClose} />
            </HStack>
            <UpdatePostDescriptionForm inputRef={ref} query={data} onClose={onClose} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
