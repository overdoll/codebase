import { HTMLChakraProps, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { useState } from 'react'

interface Props extends HTMLChakraProps<any> {
  onComplete: (time) => void
  setTime: (time) => void
  time: number
  totalTime: number
}

export default function SeekVideoButton ({
  onComplete,
  time,
  totalTime,
  setTime
}: Props): JSX.Element {
  const [isChanging, setIsChanging] = useState(false)
  const [frozenTime, setFrozenTime] = useState(0)

  const onChangeStart = (): void => {
    setFrozenTime(time)
    setIsChanging(true)
  }

  const onChangeEnd = (value): void => {
    if (value === frozenTime) {
      setIsChanging(false)
      return
    }
    setIsChanging(false)
    setTime(value)
    onComplete(value)
  }

  return (
    <Slider
      onChangeStart={onChangeStart}
      onChangeEnd={onChangeEnd}
      focusThumbOnChange={false}
      value={isChanging ? undefined : time}
      min={0}
      max={totalTime}
      step={0.1}
    >
      <SliderTrack h='2px' bg='whiteAlpha.100'>
        <SliderFilledTrack bg='whiteAlpha.700' />
      </SliderTrack>
      <SliderThumb boxSize={3} />
    </Slider>
  )
}
