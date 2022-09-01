import { graphql, useFragment } from 'react-relay'
import { PostDetailedMediaFragment$key } from '@//:artifacts/PostDetailedMediaFragment.graphql'
import ImageSnippet, {
  ImageSnippetCoverProps,
  ImageSnippetProps
} from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import PostVideoMedia from '../PostMedia/PostVideoMedia/PostVideoMedia'
import ObserveContent from '../ObserveContent/ObserveContent'
import { useDisclosure } from '@chakra-ui/react'
import { ClickableTile } from '../../../../ContentSelection'
import MediaPreviewModal from '../MediaPreviewModal/MediaPreviewModal'

interface Props {
  query: PostDetailedMediaFragment$key
  imageProps?: ImageSnippetCoverProps | ImageSnippetProps
  hideBackground?: boolean
  debounceDelay?: number
}

const Fragment = graphql`
  fragment PostDetailedMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...PostVideoMediaFragment
    ...MediaPreviewModalFragment
  }
`

export default function PostDetailedMedia (props: Props): JSX.Element {
  const {
    query,
    imageProps,
    hideBackground = false,
    debounceDelay = 300
  } = props

  const data = useFragment(Fragment, query)

  const {
    onOpen,
    onClose,
    isOpen
  } = useDisclosure()

  if (data.type === 'IMAGE') {
    return (
      <>
        <ClickableTile
          _active={{ bg: 'transparent' }}
          _hover={{ bg: 'transparent' }}
          borderRadius='none'
          onClick={onOpen}
        >
          <ImageSnippet containCover cover query={data} {...imageProps} />
        </ClickableTile>
        <MediaPreviewModal query={data} isOpen={isOpen} onClose={onClose} />
      </>
    )
  }

  return (
    <ObserveContent
      threshold={0}
      debounceDelay={debounceDelay}
    >
      {({
        isObserving,
        isObservingDebounced
      }) => (
        <PostVideoMedia
          hideBackground={hideBackground}
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
}
