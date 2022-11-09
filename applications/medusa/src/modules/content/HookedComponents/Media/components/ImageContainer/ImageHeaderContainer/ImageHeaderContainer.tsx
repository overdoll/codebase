import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import { ColorType } from '../../../types'
import { Center, Flex } from '@chakra-ui/react'
import ImageBackground from '../ImageControlContainer/ImageBackground/ImageBackground'
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
        <ImageBackground opacity={1} backgroundPoster={backgroundPoster} />
      )}
      <Center position='relative' w='100%' h='100%' objectFit='contain'>
        <Flex w='100%' h='100%' maxW='container.lg' align='center' justify='center'>
          <ImageMedia loadFirst={loadFirst} url={url} variants={variants} />
        </Flex>
      </Center>
    </Flex>
  )
}
