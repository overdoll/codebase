import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { VideoManagerContext } from '../VideoManager/VideoManager'
import { Swiper as SwiperClass } from 'swiper'

interface Props {
  children: ReactNode
}

interface VideoProps {
  ref: HTMLVideoElement
  index: number
}

interface Context {
  slidesCount: number
  currentSlide: number
  onInitialize: (swiper) => void
}

const defaultValue = {
  slidesCount: 1,
  currentSlide: 0,
  onInitialize: (swiper) => {
  }
}

export const PostManagerContext = createContext<Context>(defaultValue)

export function PostManagerProvider ({ children }: Props): JSX.Element {
  const [slidesCount, setSlidesCount] = useState(1)

  const [currentSlide, setCurrentSlide] = useState(0)

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const [videos, setVideos] = useState<VideoProps[]>([])

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }

  const observerCallback = (entries): void => {
    const [entry] = entries
    if (entry.isIntersecting as boolean) {
      (entry.target.paused) && entry.target.play()
      return
    }
    !(entry.target.paused) && entry.target.pause()
  }

  const {
    videoVolume,
    videoMuted
  } = useContext(VideoManagerContext)

  const observeVideo = new IntersectionObserver(observerCallback, observerOptions)

  const onInitialize = (swiper): void => {
    setSwiper(swiper)
    setSlidesCount(swiper.slides.length as number)

    const currentVideos = swiper.slides.map((item, index) => {
      const videoElement = item.getElementsByTagName('video') ?? []
      return {
        ref: videoElement[0],
        index: index
      }
    })

    setVideos(currentVideos.filter((item) => item.ref != null))
  }

  const findVideo = (ref): HTMLVideoElement | null => {
    return ref.getElementsByTagName('video')[0] ?? null
  }

  // Observe if viewport goes to swiper
  useEffect(() => {
    if (swiper == null) return
    const activeSlide = swiper.slides[currentSlide]
    const activeVideo = findVideo(activeSlide)
    if (activeVideo != null) {
      observeVideo.observe(activeVideo)
    }
    return () => {
      if (activeVideo != null) observeVideo.unobserve(activeVideo)
    }
  }, [swiper, currentSlide])

  // Observe slide changes and play videos as well as pause previous
  useEffect(() => {
    if (swiper == null) return
    swiper.on('slideChange', () => {
      setCurrentSlide(swiper.activeIndex)
      const activeSlide = swiper.slides[swiper.activeIndex]
      const activeVideo = findVideo(activeSlide)
      const previousVideo = findVideo(swiper.slides[swiper.previousIndex])
      if (previousVideo != null) {
        previousVideo.pause()
        return
      }
      void activeVideo?.play()
    })

    return () => {
      swiper.off('slideChange')
    }
  }, [swiper])

  useEffect(() => {
    videos.forEach((item) => {
      item.ref.volume = videoVolume
      item.ref.muted = videoMuted
    })
  }, [videoVolume, videoMuted, videos])

  const contextValue = {
    slidesCount: slidesCount,
    currentSlide: currentSlide,
    onInitialize: (swiper) => onInitialize(swiper)
  }

  return (
    <PostManagerContext.Provider value={contextValue}>
      {children}
    </PostManagerContext.Provider>
  )
}
