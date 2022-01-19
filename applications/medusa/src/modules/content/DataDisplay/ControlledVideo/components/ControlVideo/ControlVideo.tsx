import { Box, Fade, Flex, HStack, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react'
import { MutableRefObject } from 'react'
import PlayPauseButton from './PlayPauseButton/PlayPauseButton'
import VolumeButton from './VolumeButton/VolumeButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'

interface Props {
  videoRef: MutableRefObject<HTMLVideoElement | null>
  onMouseHold: () => void
  isOpen: boolean
  isLoaded: boolean
  isPaused: boolean
  isMuted: boolean
  hasAudio: boolean
  time: number
  totalTime: number
}

export default function ControlVideo ({
  videoRef,
  onMouseHold,
  isOpen,
  isLoaded,
  isPaused,
  isMuted,
  hasAudio,
  time,
  totalTime
}: Props): JSX.Element {
  const onChangeVideo = (): void => {
    const video = videoRef.current
    if (video == null) return
    if (video.paused) {
      void video.play()
      return
    }
    video.pause()
  }

  const onChangeMuted = (): void => {
    const video = videoRef.current
    if (video == null) return
    if (video.muted) {
      video.muted = false
      return
    }
    video.muted = true
  }

  return (
    <>
      <Fade unmountOnExit in={isOpen}>
        <Flex align='center' bottom={0} p={4} position='absolute' w='100%' justify='center'>
          <HStack spacing={8}>
            <PlayPauseButton
              onMouseEnter={onMouseHold}
              onClick={onChangeVideo}
              isPaused={isPaused}
            />
            <VolumeButton
              onMouseEnter={onMouseHold}
              isMuted={isMuted}
              onChangeMuted={onChangeMuted}
              hasAudio={hasAudio}
            />
          </HStack>
        </Flex>
      </Fade>
      <Flex
        bottom={-1}
        position='absolute'
        w='100%'
        align='center'
        justify='center'
      >
        <Slider value={time} min={0} max={totalTime} step={0.1}>
          <SliderTrack bg='whiteAlpha.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='whiteAlpha.700' />
          </SliderTrack>
        </Slider>
      </Flex>
      <Flex
        pointerEvents='none'
        top={0}
        position='absolute'
        w='100%'
        align='center'
        justify='center'
      >
        <LoadingSpinner isLoading={!isLoaded} />
      </Flex>
    </>
  )
}
