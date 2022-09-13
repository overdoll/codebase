import { Flex } from '@chakra-ui/react'
import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import ContainImage from '../ImageWrapper/ContainImage/ContainImage'
import { ColorType } from '../../../types'

interface Props extends Omit<ImageMediaProps, 'color'>, ColorType {
}

export default function ImageContainContainer (props: Props): JSX.Element {
  const {
    url,
    rgb,
    variants
  } = props

  const bgColor = rgb != null ? `rgb(${rgb.red},${rgb.green},${rgb.blue})` : undefined

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
      borderRadius='inherit'
      bg={bgColor ?? 'gray.800'}
    >
      <ContainImage>
        <ImageMedia
          url={url}
          color={bgColor}
          variants={variants}
        />
      </ContainImage>
    </Flex>
  )
}
