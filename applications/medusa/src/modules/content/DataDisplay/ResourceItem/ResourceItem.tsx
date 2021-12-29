import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'

interface Props extends HTMLChakraProps<any> {
  query: ResourceItemFragment$key
}

const Fragment = graphql`
  fragment ResourceItemFragment on Resource {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
`

export default function ResourceItem ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex align='center' justify='center' h='100%'>
      {data.type === 'IMAGE' &&
        <ImageSnippet {...rest} query={data} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet {...rest} query={data} />}
    </Flex>
  )
}
