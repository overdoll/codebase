/**
 * @flow
 */
import type { Node } from 'react'
import { Skeleton } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  src: string,
}

export default function ImageSnippet ({ src, ...rest }: Props): Node {
  return (
    <SuspenseImage
      alt='thumbnail'
      h='100%'
      objectFit='cover'
      {...rest}
      src={src} fallback={<Skeleton w='100%' h='100%' />}
    />
  )
}
