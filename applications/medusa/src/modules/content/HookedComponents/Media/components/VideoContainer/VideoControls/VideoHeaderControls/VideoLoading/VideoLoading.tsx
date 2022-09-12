import { Flex, Heading, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { VideoControlTypeProps } from '../../../VideoContainer'
import { Icon } from '../../../../../../../PageLayout'
import { ControlPauseButton, ControlVolumeMissing } from '@//:assets/icons'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: any
}

export default function VideoLoading (props: Props): JSX.Element {
  const {
    player,
    duration
  } = props

  const [isLoading, setLoading] = useState(false)
  const [isPaused, setPaused] = useState(false)
  const [time, setTime] = useState(player.currentTime)

  useEffect(() => {
    if (player == null) return

    const onCanPlay = (): void => {
      setLoading(false)
    }

    const onWaiting = (): void => {
      setLoading(false)
    }

    const onTimeUpdate = (player): void => {
      setTime(player.currentTime)
    }

    const onPlay = (): void => {
      setPaused(false)
    }

    const onPause = (): void => {
      setPaused(true)
    }

    player.on('canplay', onCanPlay)
    player.on('play', onPlay)
    player.on('pause', onPause)
    player.on('waiting', onWaiting)
    player.on('timeupdate', onTimeUpdate)
    return () => {
      player.off('canplay', onCanPlay)
      player.off('waiting', onWaiting)
      player.off('timeupdate', onTimeUpdate)
    }
  }, [player])

  const FLEX_PROPS = {
    align: 'center',
    justify: 'center',
    w: 12,
    h: 6,
    bg: 'dimmers.300',
    borderRadius: 'full'
  }

  // if video is paused, this will always show
  // if video is buffering, this will always show

  if (isPaused && !isLoading) {
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
            {(duration - time).toFixed(1)}
          </Heading>
        </Flex>
        <Flex align='center' justify='center' w={6} bg='dimmers.300' borderRadius='full' h={6}>
          <Icon w={2} h={2} fill='whiteAlpha.900' icon={ControlVolumeMissing} />
        </Flex>
      </HStack>
    )
  }

  return (
    <Flex {...FLEX_PROPS}>
      <BeatLoader color='white' size={6} />
    </Flex>
  )
}
