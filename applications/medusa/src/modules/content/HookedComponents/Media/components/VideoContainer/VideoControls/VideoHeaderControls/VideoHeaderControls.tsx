import { Fade, Flex } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'
import { VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import { VideoControlsOpen } from '../VideoControls'
import { useState } from 'react'
import syncPlayerLoading from '../../../../support/syncPlayerLoading'
import syncPlayerPlayPause from '../../../../support/syncPlayerPlayPause'
import syncPlayerVolumeChange from '../../../../support/syncPlayerVolumeChange'
import VideoMobileUnmute from './VideoMobileUnmute/VideoMobileUnmute'
import useSniffer from '../../../../../../../hooks/useSniffer'

interface Props extends VideoControlTypeProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player,
    duration,
    hasAudio,
    isOpen
  } = props

  const { device } = useSniffer()

  const [isLoading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(player?.video?.muted ?? true)

  syncPlayerLoading(player, setLoading)
  syncPlayerPlayPause(player, setPlaying)
  syncPlayerVolumeChange(player, () => {
  }, setMuted)

  return (
    <Flex justify='space-between' w='100%' h='100%' p={2}>
      <Fade
        in={isLoading || !playing ? true : isOpen}
      >
        <VideoLoading hasAudio={hasAudio} duration={duration} player={player} />
      </Fade>
      {(muted && hasAudio && device === 'mobile') && (
        <VideoMobileUnmute player={player} />
      )}
    </Flex>
  )
}
