import { Flex } from '@chakra-ui/react'
import { MutableRefObject, ReactNode, useRef, useState } from 'react'
import VideoWrapper, { VideoWrapperProps } from './VideoWrapper/VideoWrapper'
import VideoBackground from './VideoBackground/VideoBackground'
import VideoControls from './VideoControls/VideoControls'
import { CreateVideoProps } from './VideoWrapper/DynamicVideo/DynamicVideo'
import { OnPlayerInitType, PlayerType } from '../../types'
import { ControlTypes } from './VideoControls/VideoRequestControls/VideoRequestControls'

export interface VideoControlTypeProps {
  duration: number
  hasAudio: boolean
}

export interface VideoWatchProps {
  volume: number
  muted: boolean
  autoPlay: boolean
  currentTime: number
}

export interface ContainerRefProps {
  containerRef: MutableRefObject<HTMLDivElement | null>
}

export interface VideoContainerProps extends VideoWrapperProps, CreateVideoProps, VideoControlTypeProps, Partial<VideoWatchProps>, Partial<ControlTypes> {
  onPlayerInit?: OnPlayerInitType
  backgroundPoster?: ReactNode
}

export default function VideoContainer (props: VideoContainerProps): JSX.Element {
  const {
    poster,
    onPlayerInit,
    hlsUrls,
    mp4Url,
    aspectRatio,
    duration,
    hasAudio,
    volume = 0.1,
    muted = true,
    controls = 'advanced',
    autoPlay = false,
    currentTime = 0,
    backgroundPoster,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const [player, setPlayer] = useState<PlayerType | null>(null)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  return (
    <Flex
      ref={containerRef}
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
      borderRadius='inherit'
    >
      {backgroundPoster != null && (
        <VideoBackground
          poster={backgroundPoster}
        />
      )}
      <VideoWrapper
        autoPlay={autoPlay}
        volume={volume}
        muted={muted}
        aspectRatio={aspectRatio}
        hlsUrls={hlsUrls}
        mp4Url={mp4Url}
        onPlayerInit={(player) => setPlayers(player)}
        poster={poster}
        currentTime={currentTime}
      />
      <VideoControls
        controls={controls}
        containerRef={containerRef}
        duration={duration}
        hasAudio={hasAudio}
        player={player}
      />
    </Flex>
  )
}
