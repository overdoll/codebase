import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
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
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <NextImage
      alt='thumbnail'
      width={data.width as any ?? undefined}
      height={data.height as any ?? undefined}
      layout={data?.width == null && data?.height == null ? 'fill' : undefined}
      objectFit={'cover' as any}
      src={data?.videoThumbnail?.url ?? ''}
      {...rest}
    />
  )
}
