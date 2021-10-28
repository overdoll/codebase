/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import ImageSnippet from '../ContentItem/ImageSnippet/ImageSnippet'
import VideoSnippet from '../ContentItem/VideoSnippet/VideoSnippet'

type Props = {
  type: string,
  urls: Array<ResourceUrl>,
}

export default function ResourceItem ({ urls, type, ...rest }: Props): Node {
  return (
    <>
      {type === 'IMAGE' &&
        <ImageSnippet urls={urls} />}
      {type === 'VIDEO' &&
        <VideoSnippet urls={urls} />}
    </>
  )
}
