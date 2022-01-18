import { Box, Fade, Flex, HStack, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ControlledVideoFragment$key } from '@//:artifacts/ControlledVideoFragment.graphql'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import PlayPauseButton from './components/PlayPauseButton/PlayPauseButton'
import SimpleProgressCircle from './components/SimpleProgressCircle/SimpleProgressCircle'
import VolumeButton from './components/VolumeButton/VolumeButton'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import useTimedDisclosure from './hooks/useTimedDisclosure/useTimedDisclosure'

interface Props extends HTMLChakraProps<any> {
  onPlay?: (paused: boolean) => void
  onVolumeChange?: ({
    muted: boolean,
    volume: number
  }) => void
  defaultVolume?: number
  query: ControlledVideoFragment$key
  isMuted?: boolean
}

const Fragment = graphql`
  fragment ControlledVideoFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function ControlledVideo ({
  query,
  onPlay,
  onVolumeChange,
  defaultVolume = 0.1,
  isMuted = true,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef<HTMLVideoElement | null>(null)

  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(defaultVolume)
  const [muted, setMuted] = useState(isMuted)
  const [paused, setPaused] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [hasAudio, setHasAudio] = useState(true)

  const onChangeVideo = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.paused) {
      void video.play()
      return
    }
    video.pause()
  }

  const {
    isOpen,
    onMouseHold,
    onMouseOver,
    onMouseOut,
    onTap
  } = useTimedDisclosure({
    tapTimeout: 500,
    hoverTimeout: 3000
  })

  const onChangeMuted = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.muted) {
      video.muted = false
      return
    }
    video.muted = true
  }

  const onInitialize = (): void => {
    if (ref?.current == null) return

    ref.current.volume = volume
    // @ts-expect-error
    if (ref?.current?.webkitAudioDecodedByteCount === 0) {
      setHasAudio(false)
    }
    setLoaded(true)
  }

  const updateTime = (time): void => {
    if (ref?.current?.duration == null) return
    setTime(time / ref?.current?.duration)
  }

  useEffect(() => {
    if (ref?.current == null) return

    const changePlaying = (e): void => {
      setPaused(e.target.paused)
      onPlay?.(e)
    }

    ref?.current.addEventListener('play', changePlaying)
    return () => {
      ref?.current?.removeEventListener('play', changePlaying)
    }
  }, [ref?.current])

  useEffect(() => {
    if (ref?.current == null) return

    const changePlaying = (e): void => {
      setPaused(e.target.paused)
      onPlay?.(e)
    }
    ref?.current.addEventListener('pause', changePlaying)
    return () => {
      ref?.current?.removeEventListener('pause', changePlaying)
    }
  }, [ref?.current])

  useEffect(() => {
    if (ref?.current == null) return

    const changeVolume = (e): void => {
      setMuted(e.target.muted)
      setVolume(e.target.volume)
      onVolumeChange?.({
        muted: e.target.muted,
        volume: e.target.volume
      })
    }
    ref?.current.addEventListener('volumechange', changeVolume)
    return () => {
      ref?.current?.removeEventListener('volumechange', changeVolume)
    }
  }, [ref?.current])

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      position='relative'
    >
      <Box
        as='video'
        h='100%'
        ref={ref as MutableRefObject<any>}
        muted={muted}
        onTimeUpdate={(e: any) => updateTime(e.target.currentTime)}
        onLoadedData={onInitialize}
        onClick={onTap}
        loop
        preload='auto'
        {...rest}
      >
        {data.urls.map((item, index) => (
          <source
            key={index}
            src={item.url}
            type={item.mimeType}
          />)
        )}
      </Box>
      <Flex align='center' top={0} p={4} position='absolute' w='100%' justify='flex-end'>
        <SimpleProgressCircle isLoading={!loaded} time={time} />
      </Flex>
      <Fade unmountOnExit in={isOpen || paused}>
        <Flex align='center' bottom={0} p={4} position='absolute' w='100%' justify='space-between'>
          <PlayPauseButton
            onMouseEnter={onMouseHold}
            onClick={onChangeVideo}
            isPaused={paused}
          />
          <HStack spacing={2}>
            <VolumeButton
              onMouseEnter={onMouseHold}
              isMuted={muted}
              onChangeMuted={onChangeMuted}
              hasAudio={hasAudio}
            />
          </HStack>
        </Flex>
      </Fade>
      <Flex pointerEvents='none' top={0} position='absolute' w='100%' h='100%' align='center' justify='center'>
        <LoadingSpinner isLoading={!loaded} />
      </Flex>
    </Box>
  )
}
