/**
 * @flow
 */
import type { Node } from 'react'

type Props = {
  src: string,
  type: string,
  ref?: () => void,
}

export default function VideoSnippet ({ src, ref, objectFit, type, ...rest }: Props): Node {
  return (
    <video
      controls
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
