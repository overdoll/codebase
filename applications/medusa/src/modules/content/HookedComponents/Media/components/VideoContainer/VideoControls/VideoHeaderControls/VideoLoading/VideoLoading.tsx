import { Flex, Heading, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { VideoControlTypeProps } from '../../../VideoContainer'
import { Icon } from '../../../../../../../PageLayout'
import { ControlPauseButton, ControlVolumeMissing } from '@//:assets/icons'
import { CONTROLS_CONTAINER } from '../../../../../constants'
import syncPlayerTimeUpdate from '../../../../../support/syncPlayerTimeUpdate'
import { PlayerType } from '../../../../../types'
import syncPlayerPlayPause from '../../../../../support/syncPlayerPlayPause'
import formatSecondsIntoMinutes from '../../../../../support/formatSecondsIntoMinutes'

interface Props extends VideoControlTypeProps {
  player: PlayerType
}

export default function VideoLoading (props: Props): JSX.Element {
  const {
    player,
    duration,
    hasAudio
  } = props

  const [isLoading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(player?.video?.paused ?? true)
  const [time, setTime] = useState(player.currentTime)

  useEffect(() => {
    if (player == null) return

    const onCanPlay = (): void => {
      setLoading(false)
    }

    const onWaiting = (): void => {
      setLoading(true)
    }

    player.on('canplay', onCanPlay)
    player.on('waiting', onWaiting)
    return () => {
      player.off('canplay', onCanPlay)
      player.off('waiting', onWaiting)
    }
  }, [player])

  syncPlayerTimeUpdate(player, setTime)
  syncPlayerPlayPause(player, setPlaying)

  const FLEX_PROPS = {
    align: 'center',
    justify: 'center',
    w: 12,
    h: 6,
    ...CONTROLS_CONTAINER
  }

  // if video is paused, this will always show
  // if video is buffering, this will always show

  if (isLoading) {
    return (
      <Flex {...FLEX_PROPS}>
        <BeatLoader color='white' size={6} />
      </Flex>
    )
  }

  if (!playing && !isLoading) {
    return (
      <Flex {...FLEX_PROPS}>
        <Icon w={2} h={2} fill='whiteAlpha.900' icon={ControlPauseButton} />
      </Flex>
    )
  }

  if (!isLoading) {
    return (
      <HStack align='center' spacing={1}>
        <Flex {...FLEX_PROPS}>
          <Heading color='whiteAlpha.900' fontSize='xs'>
            {formatSecondsIntoMinutes(duration - time)}
          </Heading>
        </Flex>
        {!hasAudio && (
          <Flex {...CONTROLS_CONTAINER} align='center' justify='center' w={6} h={6}>
            <Icon w={2} h={2} fill='whiteAlpha.900' icon={ControlVolumeMissing} />
          </Flex>
        )}
      </HStack>
    )
  }

  return (
    <Flex {...FLEX_PROPS}>
      <BeatLoader color='white' size={6} />
    </Flex>
  )
}
