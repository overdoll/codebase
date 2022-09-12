import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import VideoWrapper, { VideoWrapperProps } from './VideoWrapper/VideoWrapper'
import VideoBackground from './VideoBackground/VideoBackground'
import VideoControls from './VideoControls/VideoControls'
import { CreateVideoProps } from './VideoWrapper/DynamicVideo/DynamicVideo'

export interface VideoControlTypeProps {
  duration: number
  hasAudio: boolean
}

interface Props extends VideoWrapperProps, CreateVideoProps, VideoControlTypeProps {
  onPlayerInit?: (player) => void
}

export default function VideoContainer (props: Props): JSX.Element {
  const {
    poster,
    onPlayerInit,
    hlsUrl,
    mp4Url,
    aspectRatio,
    duration,
    hasAudio
  } = props

  const [player, setPlayer] = useState(null)

  const setPlayers = (player): void => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
    >
      <VideoBackground
        poster={poster}
      />
      <VideoWrapper
        aspectRatio={aspectRatio}
        hlsUrl={hlsUrl}
        mp4Url={mp4Url}
        onPlayerInit={(player) => setPlayers(player)}
        poster={poster}
      />
      <VideoControls
        duration={duration}
        hasAudio={hasAudio}
        player={player}
      />
    </Flex>
  )
}
