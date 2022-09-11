import { FlexProps } from '@chakra-ui/react'
import type { ResourceIconMediaFragment$key } from '@//:artifacts/ResourceIconMediaFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import ImageSnippet from '../../ImageSnippet/ImageSnippet'
import VideoSnippet from '../../VideoSnippet/VideoSnippet'

interface Props extends FlexProps {
  query: ResourceIconMediaFragment$key
}

const Fragment = graphql`
  fragment ResourceIconMediaFragment on Resource {
    ...ImageSnippetFragment
    ...VideoSnippetFragment
    type
  }
`

export default function ResourceIconMedia ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.type === 'IMAGE') {
    return <ImageSnippet cover tinyError query={data} />
  }

  return <VideoSnippet cover query={data} />
}
