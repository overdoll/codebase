import { MutableRefObject } from 'react'

type VideoProps = HTMLVideoElement | null

type UseVideoControlsProps = MutableRefObject<VideoProps>

interface UseVideoControlsReturn {
  play: () => void
  pause: () => void
  ref: MutableRefObject<VideoProps>
  video: VideoProps
}

export default function useVideoControls (videoRef: UseVideoControlsProps): UseVideoControlsReturn {
  const ref = videoRef

  let videoLoaded: Promise<void> | null = null

  const onPlay = (): void => {
    if (ref?.current == null || ref?.current?.readyState < 3) return
    videoLoaded = ref.current.play()
  }

  const onPause = (): void => {
    if (ref?.current == null) return
    if (videoLoaded == null) {
      ref.current.pause()
    } else {
      void videoLoaded.then(() => {
        if (ref?.current == null) return
        ref.current.pause()
      })
    }
  }

  return {
    play: onPlay,
    pause: onPause,
    ref: ref,
    video: ref.current
  }
}
