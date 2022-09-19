import { graphql, useFragment } from 'react-relay/hooks'
import type { ExpandableResourceInfoFragment$key } from '@//:artifacts/ExpandableResourceInfoFragment.graphql'
import { useDisclosure } from '@chakra-ui/react'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import MediaPreviewModal from './MediaPreviewModal/MediaPreviewModal'
import InfoRawPostContentBanner
  from '@//:modules/content/HookedComponents/Post/fragments/PostContent/InfoRawPostContentBanner/InfoRawPostContentBanner'

interface Props {
  query: ExpandableResourceInfoFragment$key
}

const Fragment = graphql`
  fragment ExpandableResourceInfoFragment on PostContent {
    ...InfoRawPostContentBannerFragment
    ...MediaPreviewModalFragment
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

  return (
    <>
      <ClickableTile onClick={onOpen}>
        <InfoRawPostContentBanner postContentQuery={data} />
      </ClickableTile>
      <MediaPreviewModal query={data} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
