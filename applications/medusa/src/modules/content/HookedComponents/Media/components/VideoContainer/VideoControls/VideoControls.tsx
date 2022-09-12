import { ContainerRefProps, VideoControlTypeProps } from '../VideoContainer'
import { PlayerType } from '../../../types'
import VideoControlsOverlay from './VideoControlsOverlay/VideoControlsOverlay'

export interface VideoControlsOpen {
  isOpen: boolean
}

interface Props extends VideoControlTypeProps, ContainerRefProps {
  player: PlayerType | null
}

export default function VideoControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration,
    containerRef
  } = props

  if (player == null) {
    return (
      <></>
    )
  }

  return (
    <VideoControlsOverlay
      player={player}
      duration={duration}
      hasAudio={hasAudio}
      containerRef={containerRef}
    />
  )
}
