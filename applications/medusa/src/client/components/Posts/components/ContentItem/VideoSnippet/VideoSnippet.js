/**
 * @flow
 */
import type { Node } from 'react'

type Props = {
  src: string,
  type: string,
  innerRef?: () => void,
}

export default function VideoSnippet ({ src, innerRef, objectFit, type, ...rest }: Props): Node {
  return (
    <video
      controls
      ref={innerRef}
      disablePictureInPicture
      controlsList='nodownload noremoteplayback nofullscreen'
      muted loop preload='auto' {...rest} style={{
        objectFit: objectFit || 'cover',
        height: '100%'
      }}
    >
      <source src={src} type={type} />
    </video>
  )
}
