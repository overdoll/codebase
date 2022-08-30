import { graphql } from 'react-relay/hooks'
import ImageSnippet, { ImageSnippetCoverProps } from '../../ImageSnippet/ImageSnippet'
import VideoSnippet from '../../VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemMediaFragment$key } from '@//:artifacts/ResourceItemMediaFragment.graphql'

interface Props extends ImageSnippetCoverProps {
  query: ResourceItemMediaFragment$key
}

const Fragment = graphql`
  fragment ResourceItemMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
`

export default function ResourceItemMedia ({
  query,
  cover,
  containCover
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.type === 'IMAGE') {
    return <ImageSnippet containCover={containCover} cover={cover ?? true} query={data} />
  }

  return <VideoSnippet containCover={containCover} cover={cover ?? true} query={data} />
}
