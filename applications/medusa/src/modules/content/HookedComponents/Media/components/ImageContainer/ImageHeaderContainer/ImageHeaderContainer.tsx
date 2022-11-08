import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import { ColorType } from '../../../types'
import { Flex } from '@chakra-ui/react'
import ImageBackground from '../ImageControlContainer/ImageBackground/ImageBackground'
import ContainImage from '../ImageWrapper/ContainImage/ContainImage'
import { ImageBackgroundProps } from '../ImageControlContainer/ImageControlContainer'

interface Props extends Omit<ImageMediaProps, 'color'>, ColorType, Partial<ImageBackgroundProps> {
}

export default function ImageHeaderContainer (props: Props): JSX.Element {
  const {
    url,
    variants,
    backgroundPoster,
    loadFirst
  } = props

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
      borderRadius='inherit'
    >
      {backgroundPoster != null && (
        <ImageBackground backgroundPoster={backgroundPoster} />
      )}
      <ContainImage>
        <ImageMedia loadFirst={loadFirst} url={url} variants={variants} />
      </ContainImage>
    </Flex>
  )
}
