import { Fade } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'
import { VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import { VideoControlsOpen } from '../VideoControls'
import { useState } from 'react'
import syncPlayerLoading from '../../../../support/syncPlayerLoading'
import syncPlayerPlayPause from '../../../../support/syncPlayerPlayPause'

interface Props extends VideoControlTypeProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player,
    duration,
    hasAudio,
    isOpen
  } = props

  const [isLoading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  syncPlayerLoading(player, setLoading)
  syncPlayerPlayPause(player, setPlaying)

  return (
    <Fade
      in={isLoading || !playing ? true : isOpen}
    >
      <VideoLoading hasAudio={hasAudio} duration={duration} player={player} />
    </Fade>
  )
}
