import { ReactNode, useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useSwiperSlide } from 'swiper/react'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import { useDebounce } from 'usehooks-ts'

interface Props {
  children: ReactNode
  video: HTMLVideoElement | null
}

export default function ObserveVideo ({
  children,
  video
}: Props): JSX.Element {
  const ref = useRef(null)

  const slide = useSwiperSlide()

  const [observing, setObserving] = useState(false)

  const debouncedObserving = useDebounce(observing, 300)

  const isActive = slide.isActive

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  }

  const observerCallback = (entries): void => {
    const [entry] = entries
    if (video == null) return
    if (entry.isIntersecting === true) {
      if (!isActive && !video.paused) {
        void video.pause()
      }
    }
    if (entry.isIntersecting === false) {
      if (!video.paused) {
        void video.pause()
      }
    }
    setObserving(entry.isIntersecting)
  }

  let observer: IntersectionObserver

  if (CanUseDOM) {
    observer = new IntersectionObserver(observerCallback, observerOptions)
  }

  useEffect(() => {
    if (ref.current == null) return
    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref, video])

  useEffect(() => {
    if (video == null) return
    if (debouncedObserving && isActive && video.paused && video.error == null) {
      void video.play()
    }
  }, [debouncedObserving, isActive, video])

  return (
    <Box w='100%' h='100%' ref={ref}>
      {children}
    </Box>
  )
}
