import { ControlVolumeLow, ControlVolumeMuted } from '@//:assets/icons'
import { useState } from 'react'
import { muteVideo, unMuteVideo } from '../../../../../../../support/controls'
import MediaButton from '../../../../../../MediaButton/MediaButton'
import { PlayerType } from '../../../../../../../types'
import syncPlayerVolumeChange from '../../../../../../../support/syncPlayerVolumeChange'

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

  syncPlayerVolumeChange(player, () => {
  }, setMuted, setPlayer)

  if (muted) {
    return (
      <MediaButton
        onClick={() => {
          unMuteVideo(player)
          unMuteCallback?.()
        }}
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
