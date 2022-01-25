import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'
import RandomPattern from '../RandomPattern/RandomPattern'

interface Props extends HTMLChakraProps<any> {
  query: ResourceItemFragment$key | null
  h?: string | undefined
  w?: string | undefined
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
  h,
  w,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex bg='gray.800' h='100%' w='100%' direction='column' justify='center' align='center' {...rest}>
        <RandomPattern />
      </Flex>
    )
  }

  return (
    <Flex align='center' justify='center' h='100%'>
      {data.type === 'IMAGE' &&
        <ImageSnippet query={data} h={h} w={w} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet query={data} h={h} w={w} />}
    </Flex>
  )
}
