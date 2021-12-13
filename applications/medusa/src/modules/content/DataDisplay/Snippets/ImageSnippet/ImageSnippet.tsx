import { Box, ImageProps, Skeleton } from '@chakra-ui/react'
import { ResourceUrl } from '@//:types/upload'
import SuspenseImage from '@//:modules/operations/SuspenseImage'

interface Props extends ImageProps {
  urls: readonly ResourceUrl[]
}

export default function ImageSnippet ({
  urls,
  ...rest
}: Props): JSX.Element {
  return (
    <Box>
      <picture>
        {urls.map((item, index) =>
          (
            <source
              key={index}
              srcSet={item.url as string}
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
          src={urls[urls.length - 1].url as string}
          {...rest}
          fallback={<Skeleton w='100%' h='100%' />}
        />
      </picture>
    </Box>
  )
}
