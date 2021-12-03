/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'

type Props = {
  type: string,
  urls: Array<ResourceUrl>,
}

export default function ResourceItem ({ urls, type, ...rest }: Props): Node {
  return (
    <Flex>
      {type === 'IMAGE' &&
        <ImageSnippet {...rest} urls={urls} />}
      {type === 'VIDEO' &&
        <VideoSnippet {...rest} urls={urls} />}
    </Flex>
  )
}
