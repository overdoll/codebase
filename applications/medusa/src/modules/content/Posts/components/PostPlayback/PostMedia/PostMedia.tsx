import { graphql, useFragment } from 'react-relay'
import { PostMediaFragment$key } from '@//:artifacts/PostMediaFragment.graphql'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import PostVideoMedia from './PostVideoMedia/PostVideoMedia'
import { ControlledVideoProps } from '../ControlledVideo/ControlledVideo'

interface Props extends Pick<ControlledVideoProps, 'controls'> {
  query: PostMediaFragment$key
}

const Fragment = graphql`
  fragment PostMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...PostVideoMediaFragment
  }
`

export default function PostMedia ({
  query,
  controls
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const DisplayMedia = (): JSX.Element => {
    switch (data.type) {
      case 'IMAGE':
        return <ImageSnippet query={data} />
      case 'VIDEO':
        return (
          <PostVideoMedia controls={controls} query={data} />
        )
      default:
        return <></>
    }
  }

  return <DisplayMedia />
}
