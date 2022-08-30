import { graphql } from 'react-relay'
import { PostSlideIndexMediaFragment$key } from '@//:artifacts/PostSlideIndexMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageSnippet from '../../../../../DataDisplay/ImageSnippet/ImageSnippet'
import VideoSnippet from '../../../../../DataDisplay/VideoSnippet/VideoSnippet'

interface Props {
  query: PostSlideIndexMediaFragment$key
}

const Fragment = graphql`
  fragment PostSlideIndexMediaFragment on PostContent {
    resource {
      type
      ...ImageSnippetFragment
      ...VideoSnippetFragment
    }
  }
`

export default function PostSlideIndexMedia (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  if (data.resource.type === 'IMAGE') {
    return (
      <ImageSnippet
        keepWidth
        cover
        tinyError
        query={data.resource}
      />
    )
  }

  return (
    <VideoSnippet query={data.resource} />
  )
}
