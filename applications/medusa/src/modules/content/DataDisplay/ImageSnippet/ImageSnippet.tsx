import { Box } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
  query: ImageSnippetFragment$key | null
  cover?: boolean
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
  cover,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      w='100%'
      h='100%'
      position={cover === true ? 'relative' : 'static'}
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
        width={cover === true ? undefined : data?.width}
        height={cover === true ? undefined : data?.height}
        layout={cover === true ? 'fill' : 'intrinsic'}
        objectFit='cover'
        objectPosition='50% 50%'
        src={data?.urls[data?.urls.length - 1]?.url ?? data?.urls[data?.urls.length - 2]?.url ?? ''}
        {...rest}
      />
    </Box>
  )
}
