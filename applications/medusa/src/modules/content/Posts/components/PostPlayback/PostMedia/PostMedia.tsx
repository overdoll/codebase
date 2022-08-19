import { graphql, useFragment } from 'react-relay'
import { PostMediaFragment$key } from '@//:artifacts/PostMediaFragment.graphql'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import PostVideoMedia from './PostVideoMedia/PostVideoMedia'
import ObserveContent from '../ObserveContent/ObserveContent'

interface Props {
  query: PostMediaFragment$key
}

const Fragment = graphql`
  fragment PostMediaFragment on Resource {
    type
    width
    height
    ...ImageSnippetFragment
    ...PostVideoMediaFragment
  }
`

export default function PostMedia ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const DisplayMedia = (): JSX.Element => {
    switch (data.type) {
      case 'IMAGE':
        return <ImageSnippet containCover cover query={data} />
      case 'VIDEO':
        return (
          <ObserveContent height={data.height} width={data.width}>
            {({
              isObserving,
              isObservingDebounced
            }) => (
              <PostVideoMedia
                controls={{ canControl: false }}
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
