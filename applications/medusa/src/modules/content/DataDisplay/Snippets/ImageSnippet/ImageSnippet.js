/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Box, Skeleton, Image, Img, Flex } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  urls: Array<ResourceUrl>,
}

export default function ImageSnippet ({ urls, ...rest }: Props): Node {
  return (
    <Box {...rest}>
      <picture>
        {urls.map((item, index) =>
          (<source
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
          src={urls[urls.length - 1].url}
          {...rest}
          fallback={<Skeleton w='100%' h='100%' />}
        />
      </picture>
    </Box>
  )
}
