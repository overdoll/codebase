import { ControlFullscreenDisable, ControlFullscreenEnable } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { exitFullscreen, requestFullscreen } from '../../../../../support/controls'
import MediaButton from '../../../../MediaButton/MediaButton'
import { ContainerRefProps } from '../../../VideoContainer'

interface Props extends ContainerRefProps {
  player: any
}

export default function VideoFullscreen (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    containerRef
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onFullscreenChange = (): void => {
      const fullscreenEl = document.fullscreenElement ?? document.webkitFullscreenElement ?? document.mozFullScreenElement ?? document.msFullscreenElement
      setFullscreen(false)
    }

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.addEventListener(item, onFullscreenChange)
    })
    return () => {
      ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
        document.removeEventListener(item, onFullscreenChange)
      })
    }
  }, [player, setPlayer])

  if (fullscreen) {
    return (
      <MediaButton
        onClick={() => exitFullscreen(() => setFullscreen(false))}
        icon={ControlFullscreenDisable}
      />
    )
  }

  return (
    <MediaButton
      onClick={() => requestFullscreen(player, containerRef.current, () => setFullscreen(true))}
      icon={ControlFullscreenEnable}
    />
  )
}
