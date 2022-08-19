import { graphql, useFragment } from 'react-relay/hooks'
import type { MediaPreviewModalFragment$key } from '@//:artifacts/MediaPreviewModalFragment.graphql'
import { Modal, ModalBody, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react'
import PreviewMedia from './PreviewMedia/PreviewMedia'

interface Props extends Omit<ModalProps, 'children'> {
  query: MediaPreviewModalFragment$key
}

const Fragment = graphql`
  fragment MediaPreviewModalFragment on Resource {
    preview
    ...PreviewMediaFragment
  }
`

export default function MediaPreviewModal ({
  query,
  onClose,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Modal
      allowPinchZoom
      isCentered
      size='6xl'
      preserveScrollBarGap
      autoFocus={false}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay
        bg={`${data.preview}90`}
      />
      <ModalContent m={0} width='auto' boxShadow='none' bg='transparent'>
        <ModalBody p={0}>
          <PreviewMedia
            onClose={onClose}
            query={data}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
