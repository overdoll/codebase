import { PlayerType } from '../../../../../../../types'
import { useState, useTransition } from 'react'
import { CONTROLS_CONTAINER } from '../../../../../../../constants'
import { Flex, Heading, HStack, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react'
import { VideoControlTypeProps } from '../../../../../VideoContainer'
import { pauseVideo, requestPlayAfterSeeking } from '../../../../../../../support/controls'
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
    <HStack w='100%' data-ignore='controls' spacing={1}>
      <Flex
        data-ignore='controls'
        position='relative'
        {...CONTROLS_CONTAINER}
        h={12}
        w='100%'
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
          w='100%'
          h='100%'
          data-ignore='controls'
        >
          <SliderTrack data-ignore='controls' borderRadius='full' h='100%' bg='whiteAlpha.100'>
            <SliderFilledTrack data-ignore='controls' bg='primary.400' />
          </SliderTrack>
        </Slider>
        <Flex ddata-ignore='controls' pointerEvents='none' position='absolute'>
          <Heading data-ignore='controls' color='whiteAlpha.900' fontSize='md'>
            {formatSecondsIntoMinutes(time)} / {formatSecondsIntoMinutes(duration)}
          </Heading>
        </Flex>
      </Flex>
    </HStack>
  )
}
