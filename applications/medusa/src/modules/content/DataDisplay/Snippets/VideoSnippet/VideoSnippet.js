/**
 * @flow
 */
import type { Node } from 'react';
import type { ResourceUrl } from '@//:types/upload';

type Props = {
  innerRef?: () => void,
  urls: Array<ResourceUrl>,
  objectFit?: string,
}

export default function VideoSnippet ({ urls, innerRef, objectFit, ...rest }: Props): Node {
  return (
    <video
      ref={innerRef}
      disablePictureInPicture
      controlsList='nodownload noremoteplayback noplaybackrate'
      muted loop preload='auto' {...rest} style={{
        objectFit: objectFit || 'cover',
        height: '100%'
      }}
    >
      {urls.map((item, index) => (
        <source
          key={index}
          src={item.url}
          type={item.mimeType}
        />)
      )}
    </video>
  )
}
