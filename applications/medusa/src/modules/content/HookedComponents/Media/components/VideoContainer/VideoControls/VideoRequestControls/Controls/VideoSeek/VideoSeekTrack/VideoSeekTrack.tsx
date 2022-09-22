import { PlayerType } from '../../../../../../../types'
import { useState, useTransition } from 'react'
import { CONTROLS_CONTAINER } from '../../../../../../../constants'
import { Flex, Heading, HStack, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react'
import { VideoControlTypeProps } from '../../../../../VideoContainer'
import {
  fastForwardVideo,
  goBackwardVideo,
  pauseVideo,
  requestPlayAfterSeeking
} from '../../../../../../../support/controls'
import { ControlFastForwardTen, ControlGoBackwardTen } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import formatSecondsIntoMinutes from '../../../../../../../support/formatSecondsIntoMinutes'
import syncPlayerTimeUpdate from '../../../../../../../support/syncPlayerTimeUpdate'
import trackFathomEvent from '../../../../../../../../../../support/trackFathomEvent'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: PlayerType
}

export default function VideoSeekTrack (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    duration
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)
  const [time, setTime] = useState(player?.video?.currentTime ?? 0)

  // @ts-expect-error
  const [, startTransition] = useTransition({
    timeoutMs: 100
  })

  const onChangeStart = (): void => {
    pauseVideo(player)
  }

  const onChange = (value: number): void => {
    setTime(value)
    startTransition(() => {
      player.currentTime = value
    })
  }

  const onChangeEnd = (value): void => {
    setTime(value)
    player.currentTime = value
    requestPlayAfterSeeking(player)
    // track seeking
    trackFathomEvent('EFY0WCPJ', 1)
  }

  syncPlayerTimeUpdate(player, setTime, setPlayer)

  return (
    <HStack data-ignore='controls' spacing={1}>
      <Flex data-ignore='controls' {...CONTROLS_CONTAINER} h={12} w={12} align='center' justify='center'>
        <MediaButton
          w={6}
          h={6}
          onClick={() => goBackwardVideo(10, duration, player)}
          icon={ControlGoBackwardTen}
        />
      </Flex>
      <Flex
        data-ignore='controls'
        position='relative'
        {...CONTROLS_CONTAINER}
        h={12}
        w={48}
        p={2}
        align='center'
        justify='center'
      >
        <Slider
          onChange={onChange}
          onChangeEnd={onChangeEnd}
          onChangeStart={onChangeStart}
          focusThumbOnChange={false}
          value={time}
          min={0}
          max={duration}
          step={0.01}
          h='100%'
          data-ignore='controls'
        >
          <SliderTrack data-ignore='controls' borderRadius='full' h='100%' bg='whiteAlpha.100'>
            <SliderFilledTrack data-ignore='controls' bg='teal.300' />
          </SliderTrack>
        </Slider>
        <Flex ddata-ignore='controls' pointerEvents='none' position='absolute'>
          <Heading data-ignore='controls' color='whiteAlpha.800' fontSize='md'>
            {formatSecondsIntoMinutes(time)} / {formatSecondsIntoMinutes(duration)}
          </Heading>
        </Flex>
      </Flex>
      <Flex data-ignore='controls' {...CONTROLS_CONTAINER} h={12} w={12} align='center' justify='center'>
        <MediaButton
          w={6}
          h={6}
          onClick={() => fastForwardVideo(10, duration, player)}
          icon={ControlFastForwardTen}
        />
      </Flex>
    </HStack>
  )
}
