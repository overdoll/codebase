import { Box, Skeleton } from '@chakra-ui/react'
import SuspenseImage from '../../../../operations/SuspenseImage'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'

interface Props {
  query: ImageSnippetFragment$key
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function ImageSnippet ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box>
      <picture>
        {data.urls.map((item, index) =>
          (
            <source
              key={index}
              srcSet={item.url as string}
              type={item.mimeType}
            />
          )
        )}
        <SuspenseImage
          alt='thumbnail'
          w='inherit'
          h='inherit'
          objectFit='cover'
          userSelect='none'
          src={data.urls[data.urls.length - 1].url as string}
          fallback={<Skeleton w='100%' h='100%' />}
          {...rest}
        />
      </picture>
    </Box>
  )
}
