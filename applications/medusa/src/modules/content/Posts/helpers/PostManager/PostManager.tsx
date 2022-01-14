import { createContext, ReactNode, useContext, useState } from 'react'
import { VideoManagerContext } from '../VideoManager/VideoManager'

interface Props {
  children: ReactNode
}

interface Context {
  slidesCount: number
  currentSlide: number
  onSlideChange: (swiper) => void
  onInitialize: (swiper) => void
}

const defaultValue = {
  slidesCount: 1,
  currentSlide: 0,
  onSlideChange: (swiper) => {
  },
  onInitialize: (swiper) => {
  }
}

export const PostManagerContext = createContext<Context>(defaultValue)

export function PostManagerProvider ({ children }: Props): JSX.Element {
  const [slidesCount, setSlidesCount] = useState(1)

  const [currentSlide, setCurrentSlide] = useState(0)

  const {
    videoVolume,
    videoMuted
  } = useContext(VideoManagerContext)

  // TODO store the video refs in an array instead
  // TODO and on volume change in a useEffect function, set volume of refs

  // TODO use the swiper event listener after init to listen for slide changes

  const onSlideChange = (swiper): void => {
    setCurrentSlide(swiper.activeIndex)
    swiper.slides.forEach((item, index) => {
      const videoElement = item.getElementsByTagName('video') ?? []
      for (const video of videoElement) {
        video.volume = videoVolume
        video.muted = videoMuted
        if (swiper.activeIndex === index) {
          video.play()
          return
        }
        video.pause()
      }
    })
  }

  const onInitialize = (swiper): void => {
    setCurrentSlide(swiper.activeIndex)
    setSlidesCount(swiper.slides.length as number)
  }

  const contextValue = {
    slidesCount: slidesCount,
    currentSlide: currentSlide,
    onSlideChange: (swiper) => onSlideChange(swiper),
    onInitialize: (swiper) => onInitialize(swiper)
  }

  return (
    <PostManagerContext.Provider value={contextValue}>
      {children}
    </PostManagerContext.Provider>
  )
}
