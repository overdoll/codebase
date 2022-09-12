import {
  ControlFullscreenDisable,
  ControlFullscreenEnable,
  ControlPauseButton,
  ControlPlayButton
} from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { pauseVideo, playVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaButton/MediaButton'

interface Props {
  player: any
}

export default function VideoFullscreen (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onRequestFullscreen = (): void => {
      setFullscreen(true)
    }

    const onExitFullscreen = (): void => {
      setFullscreen(false)
    }

    player.on('requestFullscreen', onRequestFullscreen)
    player.on('exitFullscreen', onExitFullscreen)
    return () => {
      player.off('requestFullscreen', onRequestFullscreen)
      player.on('exitFullscreen', onExitFullscreen)
    }
  }, [player, setPlayer])

  if (fullscreen) {
    return (
      <MediaButton onClick={() => pauseVideo(player)} icon={ControlFullscreenDisable} />
    )
  }

  return (
    <MediaButton onClick={() => playVideo(player)} icon={ControlFullscreenEnable} />
  )
}
