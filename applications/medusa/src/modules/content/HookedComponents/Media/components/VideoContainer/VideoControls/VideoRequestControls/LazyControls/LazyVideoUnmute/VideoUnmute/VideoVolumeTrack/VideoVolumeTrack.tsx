import { PlayerType } from '../../../../../../../../types'
import { useState } from 'react'
import { CONTROLS_CONTAINER } from '../../../../../../../../constants'
import { Flex, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react'
import { Icon } from '../../../../../../../../../../PageLayout'
import { ControlSoundWave, ControlVolumeMuted } from '@//:assets/icons'
import syncPlayerVolumeChange from '../../../../../../../../support/syncPlayerVolumeChange'

interface Props {
  player: PlayerType
}

export default function VideoVolumeTrack (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)
  const [volume, setVolume] = useState(player?.video?.volume ?? 0)
  const [muted, setMuted] = useState(player?.video?.muted ?? true)

  const onChange = (volume: number): void => {
    if (player.video == null) return
    player.video.volume = volume
    player.video.muted = false
    setMuted(player.video.muted)
  }

  syncPlayerVolumeChange(player, setVolume, setMuted, setPlayer)

  return (
    <Flex
      data-ignore='controls'
      {...CONTROLS_CONTAINER}
      h={12}
      w={36}
      p={2}
      align='center'
      position='relative'
      justify='center'
    >
      <Slider
        onChange={onChange}
        focusThumbOnChange={false}
        value={volume}
        min={0}
        max={1}
        step={0.01}
        h='100%'
        data-ignore='controls'
      >
        <SliderTrack data-ignore='controls' borderRadius='full' h='100%' bg='whiteAlpha.100'>
          <SliderFilledTrack data-ignore='controls' bg={muted ? 'red.400' : 'green.400'} />
        </SliderTrack>
      </Slider>
      <Flex pointerEvents='none' data-ignore='controls' position='absolute'>
        <Icon w={6} h={6} icon={muted ? ControlVolumeMuted : ControlSoundWave} fill='whiteAlpha.900' />
      </Flex>
    </Flex>
  )
}
