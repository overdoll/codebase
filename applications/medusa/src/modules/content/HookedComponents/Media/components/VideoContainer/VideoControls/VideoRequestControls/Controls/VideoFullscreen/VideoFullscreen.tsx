import { ControlFullscreenDisable, ControlFullscreenEnable } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { exitFullscreen, requestFullscreen } from '../../../../../../support/controls'
import MediaButton from '../../../../../MediaControls/MediaButton/MediaButton'
import { ContainerRefProps } from '../../../../VideoContainer'
import { PlayerType } from '../../../../../../types'
import trackFathomEvent from '../../../../../../../../../support/trackFathomEvent'

interface Props extends ContainerRefProps {
  player: PlayerType
}

export default function VideoFullscreen (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    containerRef
  } = props

  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)

  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (player == null) return
    if (player.video == null) return

    const onFullscreenChange = (): void => {
      const fullscreenEl = document?.fullscreenElement ?? document?.webkitFullscreenElement ?? document?.mozFullScreenElement ?? document?.msFullscreenElement
      if (fullscreenEl != null) {
        setFullscreen(true)
      } else {
        setFullscreen(false)
      }
    }

    const onEnableFullscreen = (): void => {
      setFullscreen(true)
      // track fullscreen enable
      trackFathomEvent('QIVQ4ERG', 1)
    }

    const onDisableFullscreen = (): void => {
      setFullscreen(false)
    }

    const onWebkitPresentationMode = (): void => {
      if (player.video == null) return
      const mode = player.video.webkitPresentationMode
      if (mode !== 'fullscreen') {
        onDisableFullscreen()
      }
    }

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.addEventListener(item, onFullscreenChange)
    })
    player.video.addEventListener('webkitbeginfullscreen', onEnableFullscreen)
    player.video.addEventListener('webkitendfullscreen', onDisableFullscreen)
    player.video.addEventListener('webkitpresentationmodechanged', onWebkitPresentationMode)
    return () => {
      if (player.video == null) return
      ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
        document.removeEventListener(item, onFullscreenChange)
      })
      player.video.removeEventListener('webkitbeginfullscreen', onEnableFullscreen)
      player.video.removeEventListener('webkitendfullscreen', onDisableFullscreen)
      player.video.removeEventListener('webkitpresentationmodechanged', onWebkitPresentationMode)
    }
  }, [player, setPlayer])

  useEffect(() => {
    const handleDoubleClick = (e): void => {
      if (e.target.dataset.ignore === 'controls' || e.target.parentNode.dataset.ignore === 'controls') {
        return
      }
      if (fullscreen) {
        exitFullscreen(player)
      } else {
        requestFullscreen(player, containerRef.current)
      }
    }

    containerRef.current?.addEventListener('dblclick', handleDoubleClick)
    return () => {
      containerRef.current?.removeEventListener('dblclick', handleDoubleClick)
    }
  }, [fullscreen])

  if (fullscreen) {
    return (
      <MediaButton
        onClick={() => exitFullscreen(player)}
        icon={ControlFullscreenDisable}
      />
    )
  }

  return (
    <MediaButton
      onClick={() => requestFullscreen(player, containerRef.current)}
      icon={ControlFullscreenEnable}
    />
  )
}
