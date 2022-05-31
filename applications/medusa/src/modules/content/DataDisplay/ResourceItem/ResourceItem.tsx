import { Flex, HTMLChakraProps, Spinner } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import ImageSnippet from '../ImageSnippet/ImageSnippet'
import VideoSnippet from '../VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'
import RandomPattern from '../RandomPattern/RandomPattern'

interface Props extends HTMLChakraProps<any> {
  query: ResourceItemFragment$key | null
  h?: string | undefined
  w?: string | undefined
  seed: string | undefined
}

const Fragment = graphql`
  fragment ResourceItemFragment on Resource {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
    processed
  }
`

export default function ResourceItem ({
  query,
  seed,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex bg='gray.800' h='100%' w='100%' direction='column' justify='center' align='center' {...rest}>
        <RandomPattern seed={seed} />
      </Flex>
    )
  }

  if (!data.processed) {
    return (
      <Flex w='100%' p={4} align='center' justify='center' h='100%' {...rest}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex
      w='100%'
      h='100%'
      {...rest}
    >
      {data.type === 'IMAGE' &&
        <ImageSnippet query={data} {...rest} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet query={data} {...rest} />}
    </Flex>
  )
}
