import { graphql, useFragment } from 'react-relay'
import { PostDetailedMediaFragment$key } from '@//:artifacts/PostDetailedMediaFragment.graphql'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import PostVideoMedia from '../PostMedia/PostVideoMedia/PostVideoMedia'
import ObserveContent from '../ObserveContent/ObserveContent'
import { useDisclosure } from '@chakra-ui/react'
import { ClickableTile } from '../../../../ContentSelection'
import MediaPreviewModal from '../MediaPreviewModal/MediaPreviewModal'

interface Props {
  query: PostDetailedMediaFragment$key
}

const Fragment = graphql`
  fragment PostDetailedMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...PostVideoMediaFragment
    ...MediaPreviewModalFragment
  }
`

export default function PostDetailedMedia ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    onOpen,
    onClose,
    isOpen
  } = useDisclosure()

  const DisplayMedia = (): JSX.Element => {
    switch (data.type) {
      case 'IMAGE':
        return (
          <>
            <ClickableTile borderRadius='none' onClick={onOpen}>
              <ImageSnippet containCover cover query={data} />
            </ClickableTile>
            <MediaPreviewModal query={data} isOpen={isOpen} onClose={onClose} />
          </>
        )
      case 'VIDEO':
        return (
          <ObserveContent>
            {({
              isObserving,
              isObservingDebounced
            }) => (
              <PostVideoMedia
                controls={{
                  canSeek: true,
                  canFullscreen: true
                }}
                isObserving={isObserving}
                isObservingDebounced={isObservingDebounced}
                query={data}
              />
            )}
          </ObserveContent>
        )
      default:
        return <></>
    }
  }

  return <DisplayMedia />
}
