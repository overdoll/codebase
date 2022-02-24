import { HTMLChakraProps, Skeleton } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import SuspenseImage from '../../../operations/SuspenseImage'

interface Props extends HTMLChakraProps<any> {
  innerRef?: () => void
  query: VideoSnippetFragment$key
}

const Fragment = graphql`
  fragment VideoSnippetFragment on Resource {
    videoThumbnail {
      url
    }
  }
`

export default function VideoSnippet ({
  query,
  innerRef,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  // TODO add a placeholder in case the URL fails to load due to some error

  return (
    <SuspenseImage
      alt='thumbnail'
      w='inherit'
      h='inherit'
      objectFit='cover'
      userSelect='none'
      src={data?.videoThumbnail?.url}
      fallback={<Skeleton w='100%' h='100%' />}
      {...rest}
    />
  )
}
