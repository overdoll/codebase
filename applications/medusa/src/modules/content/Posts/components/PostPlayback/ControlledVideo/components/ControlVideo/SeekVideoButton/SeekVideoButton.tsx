import { Slider, SliderFilledTrack, SliderProps, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { useTransition } from 'react'

interface Props extends SliderProps {
  onComplete: (time) => void
  setTime: (time) => void
  time: number
  totalTime: number
}

export default function SeekVideoButton ({
  onComplete,
  time,
  totalTime,
  setTime,
  ...rest
}: Props): JSX.Element {
  // @ts-expect-error
  const [, startTransition] = useTransition({
    timeoutMs: 100
  })

  const onChange = (value): void => {
    setTime(value)
    startTransition(() => {
      onComplete(value)
    })
  }

  const onChangeEnd = (value): void => {
    setTime(value)
    onComplete(value)
  }

  return (
    <Slider
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      focusThumbOnChange={false}
      value={time}
      min={0}
      max={totalTime}
      step={0.1}
      {...rest}
    >
      <SliderTrack h='2px' bg='whiteAlpha.100'>
        <SliderFilledTrack bg='whiteAlpha.700' />
      </SliderTrack>
      <SliderThumb boxSize={3} />
    </Slider>
  )
}
