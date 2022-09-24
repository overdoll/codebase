import { Fade } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'
import { VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import { VideoControlsOpen } from '../VideoControls'
import syncPlayerPlayPause from '../../../../support/syncPlayerPlayPause'
import { useState } from 'react'

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

  const [playing, setPlaying] = useState((!(player?.video?.paused) ?? false))

  syncPlayerPlayPause(player, setPlaying, () => {
  })

  return (
    <Fade
      in={playing ? isOpen : true}
    >
      <VideoLoading hasAudio={hasAudio} duration={duration} player={player} />
    </Fade>
  )
}
