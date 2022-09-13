import { ContainerRefProps, VideoControlTypeProps, VideoWatchProps } from '../VideoContainer'
import { PlayerType } from '../../../types'
import VideoControlsOverlay from './VideoControlsOverlay/VideoControlsOverlay'
import { ControlTypes } from './VideoRequestControls/VideoRequestControls'

export interface VideoControlsOpen {
  isOpen: boolean
}

interface Props extends VideoControlTypeProps, ContainerRefProps, ControlTypes {
  player: PlayerType | null
}

export default function VideoControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration,
    containerRef,
    controls
  } = props

  if (player == null) {
    return (
      <></>
    )
  }

  return (
    <VideoControlsOverlay
      controls={controls}
      player={player}
      duration={duration}
      hasAudio={hasAudio}
      containerRef={containerRef}
    />
  )
}
