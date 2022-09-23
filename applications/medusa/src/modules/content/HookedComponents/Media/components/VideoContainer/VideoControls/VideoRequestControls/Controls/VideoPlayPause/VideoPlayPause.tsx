import { ControlPauseButton, ControlPlayButton } from '@//:assets/icons'
import { useState } from 'react'
import { pauseVideo, playVideo } from '../../../../../../support/controls'
import MediaButton from '../../../../../MediaControls/MediaButton/MediaButton'
import { PlayerType } from '../../../../../../types'
import syncPlayerPlayPause from '../../../../../../support/syncPlayerPlayPause'

interface Props {
  player: PlayerType
}

export default function VideoPlayPause (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)

  const [playing, setPlaying] = useState((!player?.video?.paused))

  syncPlayerPlayPause(player, setPlaying, setPlayer)

  if (playing) {
    return (
      <MediaButton onClick={() => pauseVideo(player)} icon={ControlPauseButton} />
    )
  }

  return (
    <MediaButton onClick={() => playVideo(player)} icon={ControlPlayButton} />
  )
}
