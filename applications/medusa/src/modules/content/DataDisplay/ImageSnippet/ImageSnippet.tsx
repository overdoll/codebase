import { Box } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
  query: ImageSnippetFragment$key | null
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    urls {
      url
      mimeType
    }
    width
    height
  }
`

export default function ImageSnippet ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      as='picture'
    >
      {data?.urls.map((item, index) =>
        (
          <source
            key={index}
            srcSet={item.url}
            type={item.mimeType}
          />
        )
      )}
      <NextImage
        alt='thumbnail'
        quality={100}
        width={data?.width as any ?? undefined}
        height={data?.height as any ?? undefined}
        layout={(data?.width == null && data?.height == null) ? 'fill' : undefined}
        objectFit={'cover' as any}
        src={data?.urls[data?.urls.length - 1]?.url ?? data?.urls[data?.urls.length - 2]?.url ?? ''}
        {...rest}
      />
    </Box>
  )
}
