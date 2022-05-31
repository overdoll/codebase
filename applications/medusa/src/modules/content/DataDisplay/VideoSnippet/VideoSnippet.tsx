import { HTMLChakraProps, Skeleton } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import SuspenseImage from '../../../operations/SuspenseImage'
import { useState } from 'react'
import ImageError from '../ImageError/ImageError'

interface Props extends HTMLChakraProps<any> {
  innerRef?: () => void
  query: VideoSnippetFragment$key
}

const Fragment = graphql`
  fragment VideoSnippetFragment on Resource {
    videoThumbnail {
      url
    }
    width
    height
  }
`

export default function VideoSnippet ({
  query,
  innerRef,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <ImageError />
    )
  }

  return (
    <SuspenseImage
      onError={() => setHasError(true)}
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
