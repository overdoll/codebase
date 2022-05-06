import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ControlledVideoFragment$key } from '@//:artifacts/ControlledVideoFragment.graphql'
import { forwardRef, useEffect, useRef, useState } from 'react'
import useTimedDisclosure from './hooks/useTimedDisclosure/useTimedDisclosure'
import RenderVideo from './components/RenderVideo/RenderVideo'
import ControlVideo from './components/ControlVideo/ControlVideo'
import { useUpdateEffect } from 'usehooks-ts'

type Controls = Partial<{
  canSeek: boolean
  canFullscreen: boolean
  canControl: boolean
}>

export interface ControlledVideoProps extends HTMLChakraProps<any> {
  query: ControlledVideoFragment$key
  onPlay?: (paused: boolean, target?) => void
  onPause?: (paused: boolean, target?) => void
  onVolumeChange?: (volume) => void
  onMute?: (muted) => void
  onInitialize?: (target) => void
  volume?: number
  isMuted?: boolean
  controls: Controls
}

const Fragment = graphql`
  fragment ControlledVideoFragment on Resource {
    ...RenderVideoFragment
  }
`

const ControlledVideo = forwardRef<any, ControlledVideoProps>(({
  query,
  onPlay: onDefaultPlay,
  onPause: onDefaultPause,
  onVolumeChange: onDefaultVolumeChange,
  onInitialize: onDefaultInitialize,
  onMute: onDefaultVolumeMute,
  volume: defaultVolume = 0.1,
  isMuted: isDefaultMuted = true,
  controls = {},
  ...rest
}: ControlledVideoProps, forwardRef): JSX.Element => {
  const data = useFragment(Fragment, query)

  const ref = useRef<HTMLVideoElement | null>(null)

  const [time, setTime] = useState(0)
  const [totalTime, setTotalTime] = useState(1)
  const [volume, setVolume] = useState(defaultVolume)
  const [isMuted, setMuted] = useState(isDefaultMuted)
  const [isPaused, setPaused] = useState(true)
  const [isLoaded, setLoaded] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)
  const [hasError, setHasError] = useState(false)

  const {
    isOpen,
    onMouseHold,
    onMouseOver,
    onMouseOut,
    onTap
  } = useTimedDisclosure({
    tapTimeout: 500,
    hoverTimeout: 3000,
    lockControl: controls?.canControl === false
  })

  const onCanPlay = (): void => {
    setLoaded(true)
    if (hasError) setHasError(false)
  }

  const onAbort = (e): void => {
    setPaused(e.target.paused)
    setHasError(true)
  }

  const onWaiting = (e): void => {
    setPaused(e.target.paused)
    setLoaded(false)
  }

  const onSetTime = (value): void => {
    setTime(value)
  }

  const onTimeUpdate = (e): void => {
    onSetTime(e.target.currentTime)
  }

  const onSeeking = (e): void => {
    setPaused(e.target.paused)
    setLoaded(false)
  }

  const onSeeked = (e): void => {
    setPaused(e.target.paused)
    setLoaded(true)
  }

  const onLoadedData = (e): void => {
    setLoaded(true)
    // This is a guess - it's not always going to be right
    if (e.target.webkitAudioDecodedByteCount === 0) {
      setHasAudio(false)
    }
  }

  const onLoadedMetadata = (e): void => {
    if (e.target.volume !== volume) {
      e.target.volume = volume
    }
    if (e.target.muted !== isMuted) {
      e.target.muted = isMuted
    }
    if (!isNaN(e.target.duration)) {
      setTotalTime(e.target.duration)
    }
  }

  const onVolumeChange = (e): void => {
    if (e.target.volume !== volume) {
      setVolume(e.target.volume)
      onDefaultVolumeChange?.(e.target.volume)
    }
    if (e.target.muted !== isMuted) {
      setMuted(e.target.muted)
      onDefaultVolumeMute?.(e.target.muted)
    }
  }

  const onPlay = (e): void => {
    setPaused(e.target.paused)
    onDefaultPlay?.(e.target.paused, e.target)
  }

  const onPause = (e): void => {
    setPaused(e.target.paused)
    onDefaultPause?.(e.target.paused, e.target)
  }

  useEffect(() => {
    if (ref.current == null) return
    if (!isNaN(ref.current.duration)) {
      setTotalTime(ref.current.duration)
    }
    onDefaultInitialize?.(ref.current)
  }, [ref.current])

  // if outside values change, update in sync
  useUpdateEffect(() => {
    if (ref.current == null) return
    ref.current.volume = defaultVolume
    ref.current.muted = isDefaultMuted
  }, [defaultVolume, isDefaultMuted, ref.current])

  return (
    <Box
      minW={60}
      minH={130}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      position='relative'
      {...rest}
    >
      <RenderVideo
        query={data}
        ref={ref}
        onClick={onTap}
        onCanPlay={onCanPlay}
        onCanPlayThrough={onCanPlay}
        onLoadedData={onLoadedData}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onAbort={onAbort}
        onLoadStart={() => setLoaded(false)}
        onError={() => setHasError(true)}
        onVolumeChange={onVolumeChange}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onPlay={onPlay}
        onPause={onPause}
        onWaiting={onWaiting}
      />
      <ControlVideo
        videoRef={ref}
        onMouseHold={onMouseHold}
        isOpen={isOpen}
        isLoaded={isLoaded}
        isPaused={isPaused}
        hasError={hasError}
        isMuted={isDefaultMuted}
        hasAudio={hasAudio}
        time={time}
        setTime={onSetTime}
        totalTime={totalTime}
        canSeek={controls?.canSeek}
        canFullscreen={controls?.canFullscreen}
        canControl={controls?.canControl}
      />
    </Box>
  )
})

export default ControlledVideo
