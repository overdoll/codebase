import { Fade, Flex, HStack, Slider, SliderFilledTrack, SliderTrack, Stack } from '@chakra-ui/react'
import { forwardRef, MutableRefObject, RefObject } from 'react'
import PlayPauseButton from './PlayPauseButton/PlayPauseButton'
import VolumeButton from './VolumeButton/VolumeButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import SeekVideoButton from './SeekVideoButton/SeekVideoButton'
import FullscreenButton from './FullscreenButton/FullscreenButton'
import useVideoControls from '../../hooks/useVideoControls/useVideoControls'
import { useFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import type { ControlVideoFragment$key } from '@//:artifacts/ControlVideoFragment.graphql'
import { ControlPauseButton } from '@//:assets/icons'
import { Icon } from '../../../../../../PageLayout'

interface Props {
  query: ControlVideoFragment$key
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
  wrapperRef: RefObject<HTMLDivElement>
}

const Fragment = graphql`
  fragment ControlVideoFragment on Resource {
    ...useVideoControlsFragment
  }
`

const ControlVideo = forwardRef<HTMLVideoElement, Props>((props: Props, forwardRef): JSX.Element => {
  const {
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
    canControl,
    wrapperRef,
    query
  } = props

  const data = useFragment(Fragment, query)

  const {
    play,
    pause,
    ref
  } = useVideoControls(forwardRef as MutableRefObject<HTMLVideoElement>, data)

  const timeExceedsLimit = totalTime > 9

  const determineCanSeek = canSeek === true && timeExceedsLimit

  const fullscreenEnabled = canFullscreen

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

  const onRequestFullscreenWrapper = (): void => {
    const video = wrapperRef.current
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
              left={0}
              right={0}
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
                {fullscreenEnabled === true &&
                  <FullscreenButton
                    onMouseEnter={onMouseHold}
                    onRequestFullscreenWrapper={onRequestFullscreenWrapper}
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
              left={0}
              right={0}
              position='absolute'
              w='100%'
              align='center'
              justify='center'
            >
              <Slider top={0} transition='100ms' isDisabled value={time} min={0} max={totalTime} step={0.1}>
                <SliderTrack borderRadius='none' h='3px' bg='whiteAlpha.100'>
                  <SliderFilledTrack bg='primary.300' />
                </SliderTrack>
              </Slider>
            </Flex>
            {isPaused && (
              <Flex
                top={4}
                right={4}
                position='absolute'
                align='center'
                justify='flex-end'
              >
                <Icon icon={ControlPauseButton} fill='whiteAlpha.600' w={6} h={6} />
              </Flex>
            )}
          </Fade>
        </>}
      <Flex
        pointerEvents={hasError ? undefined : 'none'}
        top={0}
        left={0}
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
