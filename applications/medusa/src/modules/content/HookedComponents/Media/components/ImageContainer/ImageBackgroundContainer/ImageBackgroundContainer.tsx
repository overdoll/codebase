import { Flex } from '@chakra-ui/react'
import CoverImage from '../ImageWrapper/CoverImage/CoverImage'
import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import { ColorType } from '../../../types'

interface Props extends Omit<ImageMediaProps, 'color'>, ColorType {
}

export default function ImageBackgroundContainer (props: Props): JSX.Element {
  const {
    url,
    rgb,
    variants,
    width,
    height,
    tiny,
    unoptimized,
    ...rest
  } = props

  const bgColor = typeof rgb === 'string' ? rgb : (rgb != null ? `rgb(${rgb.red},${rgb.green},${rgb.blue})` : undefined)

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
      borderRadius='inherit'
      bg={bgColor ?? 'transparent'}
    >
      <CoverImage>
        <ImageMedia
          unoptimized={unoptimized}
          tiny={tiny}
          width={width ?? 1000}
          height={height ?? 1000}
          url={url}
          color={bgColor}
          variants={variants}
          {...rest}
        />
      </CoverImage>
    </Flex>
  )
}
