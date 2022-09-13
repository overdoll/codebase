import { Flex } from '@chakra-ui/react'
import CoverImage from '../../ImageWrapper/CoverImage/CoverImage'
import { ImageBackgroundProps } from '../ImageControlContainer'

interface Props extends ImageBackgroundProps {
}

export default function ImageBackground (props: Props): JSX.Element {
  const {
    backgroundPoster
  } = props

  return (
    <Flex position='absolute' overflow='hidden' w='100%' h='100%' align='center' justify='center'>
      <Flex
        left='50%'
        w='10%'
        h='10%'
        transform='scale(11)'
        opacity={0.3}
        bg='center center / cover no-repeat'
        filter='blur(2px)'
        align='center'
        justify='center'
        objectFit='cover'
      >
        <CoverImage>
          {backgroundPoster}
        </CoverImage>
      </Flex>
    </Flex>
  )
}
