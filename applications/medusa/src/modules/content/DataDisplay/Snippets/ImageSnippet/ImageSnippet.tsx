import { Box, Skeleton } from '@chakra-ui/react'
import { ResourceUrl } from '@//:types/upload'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

interface Props {
  urls: ResourceUrl[]
}

export default function ImageSnippet ({
  urls,
  ...rest
}: Props): JSX.Element {
  return (
    <Box {...rest}>
      <picture>
        {urls.map((item, index) =>
          (
            <source
              key={index}
              srcSet={item.url}
              type={item.mimeType}
            />
          )
        )}
        <SuspenseImage
          alt='thumbnail'
          w='inherit'
          h='inherit'
          objectFit='cover'
          userSelect='none'
          src={urls[urls.length - 1].url}
          {...rest}
          fallback={<Skeleton w='100%' h='100%' />}
        />
      </picture>
    </Box>
  )
}
