import { Fade, Flex, HStack, Slider, SliderFilledTrack, SliderTrack, Stack } from '@chakra-ui/react'
import { forwardRef, MutableRefObject } from 'react'
import PlayPauseButton from './PlayPauseButton/PlayPauseButton'
import VolumeButton from './VolumeButton/VolumeButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import SeekVideoButton from './SeekVideoButton/SeekVideoButton'
import FullscreenButton from './FullscreenButton/FullscreenButton'
import useVideoControls from '../../hooks/useVideoControls/useVideoControls'

interface Props {
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

const ControlVideo = forwardRef<HTMLVideoElement, Props>(({
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
}: Props, forwardRef): JSX.Element => {
  const {
    play,
    pause,
    ref
  } = useVideoControls(forwardRef as MutableRefObject<HTMLVideoElement>)

  const determineCanSeek = canSeek === true && totalTime > 15

  const onChangeVideo = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.paused) {
      play()
      return
    }
    pause()
  }

  const onSeekStart = (): void => {
    const video = ref.current
    if (video == null) return
    if (!video.paused) {
      pause()
    }
  }

  const onSeekEnd = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.paused) {
      play()
    }
  }

  const onChangeMuted = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.muted) {
      video.muted = false
      return
    }
    video.muted = true
  }

  const onSeekVideo = (number): void => {
    const video = ref.current
    if (video == null) return
    video.currentTime = number
  }

  const onRetry = (): void => {
    const video = ref.current
    if (video == null) return
    video.load()
  }

  const onFullscreen = (): void => {
    const video = ref.current
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
              pb={3}
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
              {determineCanSeek &&
                <SeekVideoButton
                  onChangeStart={onSeekStart}
                  onChangeEnd={onSeekEnd}
                  setTime={setTime}
                  time={time}
                  totalTime={totalTime}
                  onComplete={onSeekVideo}
                />}
            </Stack>
          </Fade>
          <Fade unmountOnExit in={!isOpen}>
            <Flex
              top='1px'
              position='absolute'
              w='100%'
              align='center'
              justify='center'
            >
              <Slider transition='100ms' isDisabled value={time} min={0} max={totalTime} step={0.1}>
                <SliderTrack borderRadius='none' h='2px' bg='whiteAlpha.100'>
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
})

export default ControlVideo
