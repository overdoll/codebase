import { Fade, Flex, HStack, Slider, SliderFilledTrack, SliderTrack, Stack } from '@chakra-ui/react'
import { MutableRefObject } from 'react'
import PlayPauseButton from './PlayPauseButton/PlayPauseButton'
import VolumeButton from './VolumeButton/VolumeButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import SeekVideoButton from './SeekVideoButton/SeekVideoButton'
import FullscreenButton from './FullscreenButton/FullscreenButton'

interface Props {
  videoRef: MutableRefObject<HTMLVideoElement | null>
  onMouseHold: () => void
  setTime: (time) => void
  isOpen: boolean
  isLoaded: boolean
  isPaused: boolean
  isMuted: boolean
  hasAudio: boolean
  hasError: boolean
  time: number
  totalTime: number
  canSeek?: boolean | undefined
  canFullscreen?: boolean | undefined
  canControl?: boolean | undefined
}

export default function ControlVideo ({
  videoRef,
  onMouseHold,
  isOpen,
  isLoaded,
  isPaused,
  isMuted,
  hasAudio,
  hasError,
  setTime,
  time,
  totalTime,
  canSeek,
  canFullscreen,
  canControl
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

  const onSeekVideo = (number): void => {
    const video = videoRef.current
    if (video == null) return
    video.currentTime = number
  }

  const onRetry = (): void => {
    const video = videoRef.current
    if (video == null) return
    video.load()
  }

  const onFullscreen = (): void => {
    const video = videoRef.current
    if (video == null) return
    void video.requestFullscreen()
  }

  return (
    <>
      {!hasError &&
        <>
          <Fade unmountOnExit in={canControl === true ? false : isOpen}>
            <Stack
              align='center'
              bottom={0}
              pb={2}
              pl={6}
              pr={6}
              position='absolute'
              w='100%'
              justify='center'
              spacing={2}
            >
              <HStack spacing={6}>
                <PlayPauseButton
                  onMouseEnter={onMouseHold}
                  onClick={onChangeVideo}
                  isPaused={isPaused}
                />
                {hasAudio &&
                  <VolumeButton
                    onMouseEnter={onMouseHold}
                    isMuted={isMuted}
                    onChangeMuted={onChangeMuted}
                    hasAudio={hasAudio}
                  />}
                {canFullscreen === true &&
                  <FullscreenButton
                    onMouseEnter={onMouseHold}
                    onClick={onFullscreen}
                  />}
              </HStack>
              {canSeek === true &&
                <SeekVideoButton
                  setTime={setTime}
                  time={time}
                  totalTime={totalTime}
                  onComplete={onSeekVideo}
                />}
            </Stack>
          </Fade>
          <Fade unmountOnExit in={!isOpen}>
            <Flex
              bottom={0}
              position='absolute'
              w='100%'
              align='center'
              justify='center'
            >
              <Slider isDisabled value={time} min={0} max={totalTime} step={0.1}>
                <SliderTrack h='2px' bg='whiteAlpha.100'>
                  <SliderFilledTrack bg='whiteAlpha.700' />
                </SliderTrack>
              </Slider>
            </Flex>
          </Fade>
        </>}
      <Flex
        pointerEvents={hasError ? undefined : 'none'}
        top={0}
        position='absolute'
        w='100%'
        h='100%'
        align='center'
        justify='center'
      >
        <LoadingSpinner canControl={canControl} onRetry={onRetry} isLoading={!isLoaded} hasError={hasError} />
      </Flex>
    </>
  )
}
