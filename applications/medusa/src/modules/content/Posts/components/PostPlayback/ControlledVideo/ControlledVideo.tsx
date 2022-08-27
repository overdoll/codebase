import { Flex } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ControlledVideoFragment$key } from '@//:artifacts/ControlledVideoFragment.graphql'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import useTimedDisclosure from './hooks/useTimedDisclosure/useTimedDisclosure'
import RenderVideo from './components/RenderVideo/RenderVideo'
import ControlVideo from './components/ControlVideo/ControlVideo'
import { useUpdateEffect } from 'usehooks-ts'
import VideoBackground from '../../../../DataDisplay/VideoBackground/VideoBackground'

type Controls = Partial<{
  canSeek: boolean
  canFullscreen: boolean
  canControl: boolean
}>

export interface ControlledVideoProps {
  query: ControlledVideoFragment$key
  onPlay?: (paused: boolean, target?) => void
  onPause?: (paused: boolean, target?) => void
  onVolumeChange?: (volume) => void
  onMute?: (muted) => void
  onInitialize?: (target) => void
  volume?: number
  isMuted?: boolean
  controls: Controls
  autoPlay?: boolean | undefined
  hideBackground?: boolean
}

const Fragment = graphql`
  fragment ControlledVideoFragment on Resource {
    videoNoAudio
    ...VideoBackgroundFragment
    ...RenderVideoFragment
  }
`

const ControlledVideo = forwardRef<HTMLVideoElement, ControlledVideoProps>(({
  query,
  onPlay: onDefaultPlay,
  onPause: onDefaultPause,
  onVolumeChange: onDefaultVolumeChange,
  onInitialize: onDefaultInitialize,
  onMute: onDefaultVolumeMute,
  volume: defaultVolume = 0.1,
  isMuted: isDefaultMuted = true,
  controls = {},
  autoPlay,
  hideBackground = false
}: ControlledVideoProps, forwardRef): JSX.Element => {
  const data = useFragment(Fragment, query)

  const ref = useRef<HTMLVideoElement>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  // TODO rewrite video component with https://developer.chrome.com/blog/play-request-was-interrupted/#source-within-video-makes-play-promise-never-rejects
  // TODO and canvas projecting thumbnail until video is loaded (scrolled into view), played manually, or gets the autoplay param

  useImperativeHandle(forwardRef, () => ref.current as HTMLVideoElement)

  const [time, setTime] = useState(0)
  const [totalTime, setTotalTime] = useState(1)
  const [volume, setVolume] = useState(defaultVolume)
  const [isMuted, setMuted] = useState(isDefaultMuted)
  const [isPaused, setPaused] = useState(true)
  const [isLoaded, setLoaded] = useState(true)
  const [hasError, setHasError] = useState(false)

  const hasAudio = !data.videoNoAudio

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
  }

  const onSeeked = (e): void => {
    setPaused(e.target.paused)
  }

  const onLoadedData = (e): void => {
    setLoaded(true)
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
    if (ref.current.muted !== isDefaultMuted) {
      ref.current.muted = isDefaultMuted
    }
  }, [defaultVolume, isDefaultMuted, ref.current])

  return (
    <Flex
      ref={wrapperRef}
      minW={60}
      minH={130}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      position='relative'
      w='100%'
      h='100%'
      align='center'
      justify='center'
    >
      {!hideBackground && (
        <VideoBackground zIndex={-1} query={data} />
      )}
      <RenderVideo
        ref={ref}
        query={data}
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
        autoPlay={autoPlay}
      />
      <ControlVideo
        ref={ref}
        wrapperRef={wrapperRef}
        onMouseHold={onMouseHold}
        isOpen={isOpen}
        isLoaded={isLoaded}
        isPaused={isPaused}
        hasError={hasError}
        isMuted={isMuted}
        hasAudio={hasAudio}
        time={time}
        setTime={onSetTime}
        totalTime={totalTime}
        canSeek={controls?.canSeek}
        canFullscreen={controls?.canFullscreen}
        canControl={controls?.canControl}
      />
    </Flex>
  )
})

export default ControlledVideo
