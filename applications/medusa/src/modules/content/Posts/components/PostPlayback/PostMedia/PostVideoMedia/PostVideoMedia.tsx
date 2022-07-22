import { graphql, useFragment } from 'react-relay'
import { useContext, useEffect, useRef } from 'react'
import { PostVideoMediaFragment$key } from '@//:artifacts/PostVideoMediaFragment.graphql'
import ControlledVideo, { ControlledVideoProps } from '../../ControlledVideo/ControlledVideo'
import { GlobalVideoManagerContext } from '../../../../index'
import { useSwiperSlide } from 'swiper/react'
import { ObserveContentCallable } from '../../ObserveContent/ObserveContent'
import useVideoControls from '../../ControlledVideo/hooks/useVideoControls/useVideoControls'

interface Props extends Pick<ControlledVideoProps, 'controls'>, ObserveContentCallable {
  query: PostVideoMediaFragment$key
}

const Fragment = graphql`
  fragment PostVideoMediaFragment on Resource {
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
    changeVideoVolume
  } = useContext(GlobalVideoManagerContext)

  const {
    pause,
    play,
    ref
  } = useVideoControls(newRef)

  const slide = useSwiperSlide()

  const isActive = slide.isActive

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (isObservingDebounced && isActive && ref.current.paused) {
      play()
    }
  }, [isObservingDebounced, isActive, ref])

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (isObserving && !isActive && !ref.current.paused) {
      pause()
    }
  }, [isObserving, isActive, ref])

  useEffect(() => {
    if (ref?.current == null || ref.current.error != null) return
    if (!isObserving && !ref.current.paused) {
      pause()
    }
  }, [isObserving, ref])

  return (
    <ControlledVideo
      ref={ref}
      controls={controls}
      onVolumeChange={(volume) => changeVideoVolume(volume)}
      onMute={(muted) => changeVideoMuted(muted)}
      volume={videoVolume}
      isMuted={videoMuted}
      query={data}
    />
  )
}
