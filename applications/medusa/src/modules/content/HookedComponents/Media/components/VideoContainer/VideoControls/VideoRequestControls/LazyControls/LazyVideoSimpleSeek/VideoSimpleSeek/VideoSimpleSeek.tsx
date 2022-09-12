import { PlayerType } from '../../../../../../../types'
import { useState } from 'react'
import { CONTROLS_CONTAINER } from '../../../../../../../constants'
import { Flex } from '@chakra-ui/react'
import { VideoControlTypeProps } from '../../../../../VideoContainer'
import { fastForwardVideo } from '../../../../../../../support/controls'
import { ControlFastForwardTen } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaButton/MediaButton'
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
    <Flex {...CONTROLS_CONTAINER} h={12} w={12} align='center' justify='center'>
      <MediaButton
        w={6}
        h={6}
        onClick={() => fastForwardVideo(10, duration, player)}
        icon={ControlFastForwardTen}
      />
    </Flex>
  )
}
