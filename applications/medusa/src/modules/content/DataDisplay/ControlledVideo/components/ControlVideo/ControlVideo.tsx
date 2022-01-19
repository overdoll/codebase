import { Fade, Flex, HStack } from '@chakra-ui/react'
import { MutableRefObject } from 'react'
import PlayPauseButton from './PlayPauseButton/PlayPauseButton'
import VolumeButton from './VolumeButton/VolumeButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import SimpleProgressCircle from './SimpleProgressCircle/SimpleProgressCircle'

interface Props {
  videoRef: MutableRefObject<HTMLVideoElement | null>
  onMouseHold: () => void
  isOpen: boolean
  isLoaded: boolean
  isPaused: boolean
  isMuted: boolean
  hasAudio: boolean
  time: number
}

export default function ControlVideo ({
  videoRef,
  onMouseHold,
  isOpen,
  isLoaded,
  isPaused,
  isMuted,
  hasAudio,
  time
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
    <><Flex align='center' top={0} p={4} position='absolute' w='100%' justify='flex-end'>
      <SimpleProgressCircle isLoading={!isLoaded} time={time} />
    </Flex>
      <Fade unmountOnExit in={isOpen || isPaused}>
        <Flex align='center' bottom={0} p={4} position='absolute' w='100%' justify='space-between'>
          <PlayPauseButton
            onMouseEnter={onMouseHold}
            onClick={onChangeVideo}
            isPaused={isPaused}
          />
          <HStack spacing={2}>
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
        pointerEvents='none'
        top={0}
        position='absolute'
        w='100%'
        h='100%'
        align='center'
        justify='center'
      >
        <LoadingSpinner isLoading={!isLoaded} />
      </Flex>
    </>
  )
}
