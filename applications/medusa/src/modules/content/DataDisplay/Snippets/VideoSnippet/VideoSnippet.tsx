import { Box } from '@chakra-ui/react'
import { ResourceUrl } from '@//:types/upload'

interface Props {
  innerRef?: () => void
  urls: ResourceUrl[]
  objectFit?: string
}

export default function VideoSnippet ({
  urls,
  innerRef,
  objectFit,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      as='video'
      ref={innerRef}
      disablePictureInPicture
      controlsList='nodownload noremoteplayback noplaybackrate'
      muted
      loop
      preload='auto'
      style={{
        // @ts-expect-error
        objectFit: objectFit ?? 'cover',
        height: '100%'
      }}
      {...rest}
    >
      {urls.map((item, index) => (
        <source
          key={index}
          src={item.url}
          type={item.mimeType}
        />)
      )}
    </Box>
  )
}
