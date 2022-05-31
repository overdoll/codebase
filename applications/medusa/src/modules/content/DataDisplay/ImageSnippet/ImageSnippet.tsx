import { Box, HTMLChakraProps, Skeleton } from '@chakra-ui/react'
import SuspenseImage from '../../../operations/SuspenseImage'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import { useState } from 'react'
import ImageError from '../ImageError/ImageError'

interface Props extends HTMLChakraProps<any> {
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

  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <ImageError />
    )
  }

  return (
    <Box w='100%' h='100%' as='picture'>
      {data?.urls.map((item, index) =>
        (
          <source
            key={index}
            srcSet={item.url}
            type={item.mimeType}
          />
        )
      )}
      <SuspenseImage
        onError={() => setHasError(true)}
        alt='thumbnail'
        w='inherit'
        h='inherit'
        objectFit='cover'
        userSelect='none'
        src={data?.urls[data?.urls.length - 1].url}
        fallback={<Skeleton w='100%' h='100%' />}
        {...rest}
      />
    </Box>
  )
}
