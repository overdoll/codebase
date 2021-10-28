/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Skeleton, Image } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  urls: Array<ResourceUrl>,
}

export default function ImageSnippet ({ urls, ...rest }: Props): Node {
  // TODO provide image fallbacks?
  const url = urls[0].url

  return (
    <SuspenseImage
      alt='thumbnail'
      objectFit='cover'
      userSelect='none'
      w='inherit'
      {...rest}
      src={url} fallback={<Skeleton w='100%' h='100%' {...rest} />}
    />
  )
}
