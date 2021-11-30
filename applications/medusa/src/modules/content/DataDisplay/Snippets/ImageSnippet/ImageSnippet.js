/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Box, Skeleton } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  urls: Array<ResourceUrl>,
}

export default function ImageSnippet ({ urls, ...rest }: Props): Node {
  const url = urls[0].url
  /*
  return (
     <SuspenseImage
       alt='thumbnail'

       w='inherit'
       {...rest}
       src={url} fallback={<Skeleton w='100%' h='100%' {...rest} />}
     />
   )
   */

  return (
    <Box
      objectFit='cover'
      userSelect='none'
    >
      <picture>
        {urls.map((item, index) =>
          (<source
            key={index}
            srcSet={item.url}
            type={item.mimeType}
          />
          )
        )}
      </picture>
    </Box>
  )
}
