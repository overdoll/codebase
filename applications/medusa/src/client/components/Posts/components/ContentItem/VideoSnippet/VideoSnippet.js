/**
 * @flow
 */
import type { Node } from 'react'
import type { ResourceUrl } from '@//:types/upload'
import { Suspense } from 'react'
import { Skeleton } from '@chakra-ui/react'

type Props = {
  innerRef?: () => void,
  urls: Array<ResourceUrl>
}

export default function VideoSnippet ({ urls, innerRef, objectFit, ...rest }: Props): Node {
  return (
    <video
      ref={innerRef}
      disablePictureInPicture
      controlsList='nodownload noremoteplayback nofullscreen noplaybackrate'
      muted loop preload='auto' {...rest} style={{
        objectFit: objectFit || 'cover',
        height: '100%'
      }}
    >
      {urls.map((item, index) => (
        <source
          key={index}
          src={'https://overdoll.test/api/upload/' + item.url}
          type={item.mimeType}
        />)
      )}
    </video>
  )
}
