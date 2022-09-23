import { PlayerType } from '../../../../../../../types'
import { useState } from 'react'
import { VideoControlTypeProps } from '../../../../../VideoContainer'
import { fastForwardVideo } from '../../../../../../../support/controls'
import { ControlFastForwardTen } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import syncPlayerTimeUpdate from '../../../../../../../support/syncPlayerTimeUpdate'
import trackFathomEvent from '../../../../../../../../../../support/trackFathomEvent'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: PlayerType
}

export default function VideoSimpleSeek (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    duration
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const onSeek = (): void => {
    fastForwardVideo(10, duration, player)
    // track video simple seek
    trackFathomEvent('JUQJWED9', 1)
  }

  syncPlayerTimeUpdate(player, () => {
  }, setPlayer)

  return (
    <MediaButton
      w={6}
      h={6}
      onClick={onSeek}
      icon={ControlFastForwardTen}
    />
  )
}
