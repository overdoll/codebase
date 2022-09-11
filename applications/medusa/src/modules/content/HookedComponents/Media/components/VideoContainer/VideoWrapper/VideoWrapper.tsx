import DynamicVideo, { CreateVideoProps } from './DynamicVideo/DynamicVideo'
import { useHydrate } from '../../../../../../hydrate'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import CoverImage from '../../NextImage/CoverImage/CoverImage'

export interface VideoWrapperProps {
  poster: ReactNode
  aspectRatio: {
    width: number
    height: number
  }
}

interface Props extends VideoWrapperProps, CreateVideoProps {
  onPlayerInit: (player) => void
}

export default function VideoWrapper (props: Props): JSX.Element {
  const {
    poster,
    onPlayerInit,
    hlsUrl,
    mp4Url,
    aspectRatio
  } = props

  const isHydrated = useHydrate()
  const [player, setPlayer] = useState(null)

  const setPlayers = (player): void => {
    setPlayer(player)
    onPlayerInit(player)
  }

  const FLEX_PROPS: FlexProps = {
    align: 'center',
    justify: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }

  // aspect ratio determine box sizing here
  return (
    <Flex
      align='center'
      justify='center'
      position='relative'
      width='100%'
      paddingTop={`${(aspectRatio.height / aspectRatio.width) * 100}%`}
    >
      <Flex {...FLEX_PROPS}>
        <CoverImage>
          {poster}
        </CoverImage>
      </Flex>
      <Flex {...FLEX_PROPS}>
        {isHydrated && (
          <DynamicVideo
            hlsUrl={hlsUrl}
            mp4Url={mp4Url}
            onPlayerInit={(player) => setPlayers(player)}
          />)}
      </Flex>
    </Flex>
  )
}
