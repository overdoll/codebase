import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import CoverImage from '../../ImageContainer/ImageWrapper/CoverImage/CoverImage'

interface Props {
  poster: ReactNode
}

export default function VideoBackground (props: Props): JSX.Element {
  const {
    poster
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
          {poster}
        </CoverImage>
      </Flex>
    </Flex>
  )
}
