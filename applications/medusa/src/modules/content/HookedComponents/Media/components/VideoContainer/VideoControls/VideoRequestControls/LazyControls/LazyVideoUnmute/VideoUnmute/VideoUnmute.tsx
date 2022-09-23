import { ControlVolumeLow, ControlVolumeMuted } from '@//:assets/icons'
import { useState } from 'react'
import { muteVideo, unMuteVideo } from '../../../../../../../support/controls'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import { PlayerType } from '../../../../../../../types'
import syncPlayerVolumeChange from '../../../../../../../support/syncPlayerVolumeChange'
import trackFathomEvent from '../../../../../../../../../../support/trackFathomEvent'

interface Props {
  player: PlayerType
  unMuteCallback?: () => void
}

export default function VideoUnmute (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    unMuteCallback
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [muted, setMuted] = useState(player?.video?.muted ?? true)

  const onUnMuteVideo = (): void => {
    unMuteVideo(player)
    unMuteCallback?.()
    // track video unmute
    trackFathomEvent('101EOY3R', 1)
  }

  syncPlayerVolumeChange(player, () => {
  }, setMuted, setPlayer)

  if (muted) {
    return (
      <MediaButton
        onClick={onUnMuteVideo}
        icon={ControlVolumeMuted}
      />
    )
  }

  return (
    <MediaButton
      onClick={() => {
        muteVideo(player)
        unMuteCallback?.()
      }}
      icon={ControlVolumeLow}
    />
  )
}
