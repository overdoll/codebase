import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GlobalVideoManagerContext } from '../GlobalVideoManager/GlobalVideoManager'
import { Swiper as SwiperClass } from 'swiper'
import { ObserverManagerContext } from '../ObserverManager/ObserverManager'

interface Props {
  children: ReactNode
}

interface VideoProps {
  target: HTMLVideoElement
  index: number
}

interface Context {
  slidesCount: number
  currentSlide: number
  onInitialize: (swiper) => void
  onVideoInitialize: (target, index) => void
  setIdentifier: (id) => void
}

const defaultValue = {
  slidesCount: 1,
  currentSlide: 0,
  onInitialize: (swiper) => {
  },
  onVideoInitialize: (target, index) => {
  },
  setIdentifier: (id) => {
  }
}

export const PostVideoManagerContext = createContext<Context>(defaultValue)

export function PostVideoManagerProvider ({ children }: Props): JSX.Element {
  const [slidesCount, setSlidesCount] = useState(1)

  const [identifier, setIdentifier] = useState<string | null>(null)

  const [currentSlide, setCurrentSlide] = useState(0)

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const [videos, setVideos] = useState<VideoProps[]>([])

  const {
    videoVolume,
    videoMuted,
    handleOnscreenVideos,
    handleOffscreenVideos
  } = useContext(GlobalVideoManagerContext)

  const {
    isObserving
  } = useContext(ObserverManagerContext)

  const onInitialize = (swiper): void => {
    setSwiper(swiper)
    setSlidesCount(swiper.slides.length as number)
  }

  const onVideoInitialize = (target, index): void => {
    setVideos(x => [...x, {
      target: target,
      index: index
    }])
  }

  // Observe intersection and play videos if they are in the current slide
  useEffect(() => {
    if (!isObserving) {
      videos.forEach((item) => {
        if (item.index === currentSlide) {
          item.target.pause()
        }
      })
      return
    }
    videos.forEach((item) => {
      if (item.index === currentSlide) {
        void item.target.play()
        return
      }
      !item.target.paused && item.target.pause()
    })
  }, [isObserving, videos, currentSlide])

  // Update videos if muted value changes
  useEffect(() => {
    videos.forEach((item) => {
      if (item.target.muted !== videoMuted) {
        item.target.muted = videoMuted
      }
    })
  }, [videoMuted, videos])

  // Update videos if volume value changes
  useEffect(() => {
    videos.forEach((item) => {
      if (item.target.volume !== videoVolume) {
        item.target.volume = videoVolume
      }
    })
  }, [videoVolume, videos])

  // Update value when slide index changes
  useEffect(() => {
    if (swiper == null) return
    swiper.on('slideChange', () => {
      setCurrentSlide(swiper.activeIndex)
    })

    return () => {
      swiper.off('slideChange')
    }
  }, [swiper, setCurrentSlide])

  // Add non-observed videos to the video manager, so we can change their values
  useEffect(() => {
    if (identifier == null || videos.length < 1) return

    const targets = videos.map((item) => item.target)

    if (!isObserving) {
      handleOnscreenVideos?.(identifier, targets)
      return
    }
    handleOffscreenVideos?.(identifier, targets)
  }, [isObserving, videos, identifier])

  const contextValue = {
    slidesCount: slidesCount,
    currentSlide: currentSlide,
    onInitialize: (swiper) => onInitialize(swiper),
    onVideoInitialize: (target, index) => onVideoInitialize(target, index),
    setIdentifier: (id) => setIdentifier(id)
  }

  return (
    <PostVideoManagerContext.Provider value={contextValue}>
      {children}
    </PostVideoManagerContext.Provider>
  )
}
