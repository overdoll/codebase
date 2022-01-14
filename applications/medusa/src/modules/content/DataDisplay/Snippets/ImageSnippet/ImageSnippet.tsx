import { Box, HTMLChakraProps, Skeleton } from '@chakra-ui/react'
import SuspenseImage from '../../../../operations/SuspenseImage'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'

interface Props extends HTMLChakraProps<any> {
  query: ImageSnippetFragment$key
  h?: string | undefined
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
  h,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  // TODO add a placeholder in case the URL fails to load due to some error

  return (
    <Box h={h} as='picture'>
      {data.urls.map((item, index) =>
        (
          <source
            key={index}
            srcSet={item.url}
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
        src={data.urls[data.urls.length - 1].url}
        fallback={<Skeleton w='100%' h='100%' />}
        {...rest}
      />
    </Box>
  )
}
