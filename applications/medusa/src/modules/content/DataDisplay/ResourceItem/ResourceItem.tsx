import { Flex } from '@chakra-ui/react'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'
import { ResourceUrl } from '@//:types/upload'

interface Props {
  type: string
  urls: readonly ResourceUrl[]
}

export default function ResourceItem ({
  urls,
  type,
  ...rest
}: Props): JSX.Element {
  return (
    <Flex>
      {type === 'IMAGE' &&
        <ImageSnippet {...rest} urls={urls} />}
      {type === 'VIDEO' &&
        <VideoSnippet {...rest} urls={urls} />}
    </Flex>
  )
}
