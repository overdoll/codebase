import { PlayerType } from '../../../../../types'
import useSniffer from '../../../../../../../../hooks/useSniffer'
import { unMuteVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaControls/MediaButton/MediaButton'
import { ControlVolumeMuted } from '@//:assets/icons'
import { Center } from '@chakra-ui/react'
import { CONTROLS_CONTAINER } from '../../../../../constants'

interface Props {
  player: PlayerType
}

export default function VideoMobileUnmute (props: Props): JSX.Element {
  const {
    player
  } = props

  const { device } = useSniffer()

  const onUnMuteVideo = (): void => {
    unMuteVideo(player, device)
  }

  return (
    <Center data-ignore='tap' w={8} h={8} {...CONTROLS_CONTAINER} borderRadius='lg'>
      <MediaButton
        data-ignore='tap'
        w={4}
        h={4}
        onClick={onUnMuteVideo}
        icon={ControlVolumeMuted}
      />
    </Center>
  )
}
