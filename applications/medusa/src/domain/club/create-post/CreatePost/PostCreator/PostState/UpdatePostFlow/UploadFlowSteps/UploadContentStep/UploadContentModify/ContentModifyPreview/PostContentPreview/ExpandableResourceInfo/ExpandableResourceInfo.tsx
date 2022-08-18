import { graphql, useFragment } from 'react-relay/hooks'
import type { ExpandableResourceInfoFragment$key } from '@//:artifacts/ExpandableResourceInfoFragment.graphql'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'
import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import PreviewMedia from './PreviewMedia/PreviewMedia'

interface Props {
  query: ExpandableResourceInfoFragment$key
}

const Fragment = graphql`
  fragment ExpandableResourceInfoFragment on PostContent {
    ...ResourceInfoFragment
    resource {
      processed
      preview
      ...PreviewMediaFragment
    }
  }
`

export default function ExpandableResourceInfo ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    onOpen,
    onClose,
    isOpen
  } = useDisclosure()

  if (data.resource == null || !data.resource.processed) {
    return (
      <ResourceInfo containCover query={data} />
    )
  }

  return (
    <>
      <ClickableTile onClick={onOpen}>
        <ResourceInfo containCover query={data} />
      </ClickableTile>
      <Modal
        allowPinchZoom
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='6xl'
        preserveScrollBarGap
      >
        <ModalOverlay
          bg={`${data.resource.preview}90`}
        />
        <ModalContent m={0} width='auto' boxShadow='none' bg='transparent'>
          <ModalBody p={0}>
            <PreviewMedia
              query={data.resource}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
