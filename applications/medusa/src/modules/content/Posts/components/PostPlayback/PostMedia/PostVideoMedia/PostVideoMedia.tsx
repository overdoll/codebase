import { graphql, useFragment } from 'react-relay'
import { useContext, useEffect, useRef } from 'react'
import { PostVideoMediaFragment$key } from '@//:artifacts/PostVideoMediaFragment.graphql'
import ControlledVideo, { ControlledVideoProps } from '../../ControlledVideo/ControlledVideo'
import { GlobalVideoManagerContext } from '../../../../index'
import { useSwiperSlide } from 'swiper/react'
import { ObserveContentCallable } from '../../ObserveContent/ObserveContent'
import useVideoControls from '../../ControlledVideo/hooks/useVideoControls/useVideoControls'
import { useUpdateEffect } from 'usehooks-ts'

interface Props extends Pick<ControlledVideoProps, 'controls'>, ObserveContentCallable {
  query: PostVideoMediaFragment$key
}

const Fragment = graphql`
  fragment PostVideoMediaFragment on Resource {
    id
    ...ControlledVideoFragment
  }
`

export default function PostVideoMedia ({
  query,
  controls,
  isObserving,
  isObservingDebounced
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const newRef = useRef(null)

  const {
    videoMuted,
    videoVolume,
    changeVideoMuted,
    changeVideoVolume,
    videoPlaying,
    onPauseVideo,
    onPlayVideo
  } = useContext(GlobalVideoManagerContext)

  const {
    pause,
    play,
    ref
  } = useVideoControls(newRef)

  const slide = useSwiperSlide()

  const isActive = slide.isActive

  const canPlay = videoPlaying === data.id

  const onPlay = (): void => {
    play()
    onPlayVideo(data.id)
  }

  const onPauseFromVideo = (): void => {
    onPauseVideo(data.id)
  }

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (isObservingDebounced && isActive && ref.current.paused) {
      onPlay()
    }
  }, [isObservingDebounced, isActive, ref, data.id])

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (isObserving && !isActive && !ref.current.paused) {
      onPauseFromVideo()
    }
  }, [isObserving, isActive, ref, data.id])

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (!isObserving && !ref.current.paused) {
      onPauseFromVideo()
    }
  }, [isObserving, ref, data.id])

  useUpdateEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (!canPlay) {
      pause()
    }
  }, [canPlay, ref])

  return (
    <ControlledVideo
      autoPlay={isObservingDebounced}
      ref={ref}
      controls={controls}
      onPause={onPauseFromVideo}
      onVolumeChange={(volume) => changeVideoVolume(volume)}
      onMute={(muted) => changeVideoMuted(muted)}
      volume={videoVolume}
      isMuted={videoMuted}
      query={data}
    />
  )
}
