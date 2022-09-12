import { ControlPauseButton, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { pauseVideo, playVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaButton/MediaButton'

interface Props {
  player: any
}

export default function VideoPlayPause (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onPlay = (player): void => {
      setPlayer(player)
      setPlaying(true)
    }

    const onPause = (player): void => {
      setPlayer(player)
      setPlaying(false)
    }

    player.on('play', onPlay)
    player.on('pause', onPause)
    return () => {
      player.off('play', onPlay)
      player.on('pause', onPause)
    }
  }, [player, setPlayer])

  if (playing) {
    return (
      <MediaButton onClick={() => pauseVideo(player)} icon={ControlPauseButton} />
    )
  }

  return (
    <MediaButton onClick={() => playVideo(player)} icon={ControlPlayButton} />
  )
}
