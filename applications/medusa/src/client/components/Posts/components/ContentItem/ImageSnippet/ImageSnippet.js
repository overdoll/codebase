/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Skeleton } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  urls: Array<ResourceUrl>,
}

export default function ImageSnippet ({ urls, ...rest }: Props): Node {
  // TODO this is temporary to solve a bug that will be fixed later
  const url = 'https://overdoll.test/api/upload/' + urls[0].url

  return (
    <SuspenseImage
      alt='thumbnail'
      h='100%'
      objectFit='cover'
      {...rest}
      src={url} fallback={<Skeleton w='100%' h='100%' />}
    />
  )
}
