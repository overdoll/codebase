import { PlayerType } from '../../../../../../../types'
import { useState } from 'react'
import { VideoControlTypeProps } from '../../../../../VideoContainer'
import { fastForwardVideo } from '../../../../../../../support/controls'
import { ControlFastForwardTen } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import syncPlayerTimeUpdate from '../../../../../../../support/syncPlayerTimeUpdate'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: PlayerType
}

export default function VideoSimpleSeek (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    duration
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  syncPlayerTimeUpdate(player, () => {
  }, setPlayer)

  return (
    <MediaButton
      w={6}
      h={6}
      onClick={() => fastForwardVideo(10, duration, player)}
      icon={ControlFastForwardTen}
    />
  )
}
