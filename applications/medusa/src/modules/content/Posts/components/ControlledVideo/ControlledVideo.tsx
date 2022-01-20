import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ControlledVideoFragment$key } from '@//:artifacts/ControlledVideoFragment.graphql'
import { useRef, useState } from 'react'
import useTimedDisclosure from './hooks/useTimedDisclosure/useTimedDisclosure'
import RenderVideo from './components/RenderVideo/RenderVideo'
import ControlVideo from './components/ControlVideo/ControlVideo'

interface Props extends HTMLChakraProps<any> {
  query: ControlledVideoFragment$key
  onPlay?: (paused: boolean, target?) => void
  onPause?: (paused: boolean, target?) => void
  onVolumeChange?: (volume) => void
  onMute?: (muted) => void
  onInitialize?: (target) => void
  volume?: number
  isMuted?: boolean
}

const Fragment = graphql`
  fragment ControlledVideoFragment on Resource {
    ...RenderVideoFragment
  }
`

export default function ControlledVideo ({
  query,
  onPlay: onDefaultPlay,
  onPause: onDefaultPause,
  onVolumeChange: onDefaultVolumeChange,
  onInitialize: onDefaultInitialize,
  onMute: onDefaultVolumeMute,
  volume: defaultVolume = 0.1,
  isMuted: isDefaultMuted = true,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef<HTMLVideoElement | null>(null)

  const [time, setTime] = useState(0)
  const [totalTime, setTotalTime] = useState(1)
  const [volume, setVolume] = useState(defaultVolume)
  const [isMuted, setMuted] = useState(isDefaultMuted)
  const [isPaused, setPaused] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)

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

  const onInitialize = (e): void => {
    if (e.target.volume !== volume) {
      e.target.volume = volume
    }
    if (e.target.muted !== isMuted) {
      e.target.muted = isMuted
    }
    if (e.target.webkitAudioDecodedByteCount === 0) {
      setHasAudio(false)
    }
    setTotalTime(e.target.duration)
    setLoaded(true)
    onDefaultInitialize?.(e.target)
  }

  const onTimeUpdate = (e): void => {
    setTime(e.target.currentTime)
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

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      position='relative'
      cursor={isOpen ? undefined : 'none'}
      {...rest}
    >
      <RenderVideo
        query={data}
        sendRef={ref}
        onClick={onTap}
        onLoadedData={onInitialize}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={onVolumeChange}
        onPlay={onPlay}
        onPause={onPause}
      />
      <ControlVideo
        videoRef={ref}
        onMouseHold={onMouseHold}
        isOpen={isOpen}
        isLoaded={isLoaded}
        isPaused={isPaused}
        isMuted={isDefaultMuted}
        hasAudio={hasAudio}
        time={time}
        totalTime={totalTime}
      />
    </Box>
  )
}
