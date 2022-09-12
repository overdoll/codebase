import { ControlVolumeLow, ControlVolumeMuted } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { muteVideo, unMuteVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaButton/MediaButton'
import { VideoControlTypeProps } from '../../../VideoContainer'

interface Props extends Pick<VideoControlTypeProps, 'hasAudio'> {
  player: any
}

export default function VideoSimpleUnmute (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    hasAudio
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onVolumeChange = (player): void => {
      setPlayer(player)
      setMuted(player.video.muted)
    }

    player.on('volumechange', onVolumeChange)
    return () => {
      player.off('volumechange', onVolumeChange)
    }
  }, [player, setPlayer])

  if (!hasAudio) {
    return <></>
  }

  if (muted) {
    return (
      <MediaButton onClick={() => unMuteVideo(player)} icon={ControlVolumeMuted} />
    )
  }

  return (
    <MediaButton onClick={() => muteVideo(player)} icon={ControlVolumeLow} />
  )
}
