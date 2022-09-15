import { graphql, useFragment } from 'react-relay/hooks'
import type { ExpandableResourceInfoFragment$key } from '@//:artifacts/ExpandableResourceInfoFragment.graphql'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'
import { useDisclosure } from '@chakra-ui/react'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import MediaPreviewModal from '@//:modules/content/Posts/components/PostPlayback/MediaPreviewModal/MediaPreviewModal'

interface Props {
  query: ExpandableResourceInfoFragment$key
}

const Fragment = graphql`
  fragment ExpandableResourceInfoFragment on PostContent {
    ...ResourceInfoFragment
    resource {
      processed
      ...MediaPreviewModalFragment
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
      <MediaPreviewModal query={data.resource} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
