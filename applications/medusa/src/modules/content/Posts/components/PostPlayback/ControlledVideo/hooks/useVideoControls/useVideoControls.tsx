import { MutableRefObject, useState } from 'react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { useVideoControlsFragment$key } from '@//:artifacts/useVideoControlsFragment.graphql'

type VideoProps = HTMLVideoElement | null

type UseVideoControlsProps = MutableRefObject<VideoProps>

interface UseVideoControlsReturn {
  play: () => void
  pause: () => void
  ref: MutableRefObject<VideoProps>
  video: VideoProps
}

const Fragment = graphql`
  fragment useVideoControlsFragment on Resource {
    id
    urls {
      url
      mimeType
    }
  }
`

export default function useVideoControls (videoRef: UseVideoControlsProps, query: useVideoControlsFragment$key): UseVideoControlsReturn {
  const ref = videoRef

  const data = useFragment(Fragment, query)

  const webmVideoSource = data.urls.filter((item) => item.mimeType === 'video/webm')?.[0]
  const mp4VideoSource = data.urls.filter((item) => item.mimeType === 'video/mp4')?.[0]

  const [currentSrc, setCurrentSrc] = useState('')

  let videoLoaded: Promise<void> | null = null

  const onPlay = (): void => {
    if (ref?.current == null) return

    if ((currentSrc !== webmVideoSource?.url) && (currentSrc !== mp4VideoSource?.url) && currentSrc !== '') {
      fetchVideoAndPlay()
      return
    }

    if (ref.current.src === '') {
      fetchVideoAndPlay()
      return
    }
    if (ref?.current?.readyState < 3) {
      // TODO queue playing until video reaches a certain ready state
    }
    videoLoaded = ref.current.play().then(() => {
      // TODO do something if video plays?
    }).catch(e => {
      // TODO catch playing error
    })
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

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const fetchVideoUrl = async (url): Promise<Blob | void> => {
    if (ref.current == null) return
    return await fetch(url)
      .then(async response => await response.blob())
      .then(async blob => {
        if (ref.current == null) return
        ref.current.src = URL.createObjectURL(blob)
        ref.current.load()
        setCurrentSrc(url)
        void ref.current.play()
      })
  }

  const fetchVideoAndPlay = (): void => {
    if (ref?.current == null) return
    ref.current.src = ''

    if (webmVideoSource == null) {
      fetchVideoUrl(mp4VideoSource.url)
        .then(_ => {
        })
        .catch(e => {
          // Video playback 2 failed
        })
      return
    }

    fetchVideoUrl(mp4VideoSource.url)
      .then(_ => {
      })
      .catch(e => {
        if (webmVideoSource == null) return
        fetchVideoUrl(webmVideoSource.url)
          .then(_ => {

          })
          .catch(e => {
            // Video playback 2 failed
          })
      })
  }

  return {
    play: onPlay,
    pause: onPause,
    ref: ref,
    video: ref.current
  }
}
