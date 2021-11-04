/**
 * @flow
 */
import { useFragment, graphql } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { PostGalleryContentFragment$key } from '@//:artifacts/PostGalleryContentFragment.graphql'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../../../DataDisplay/Snippets/VideoSnippet/VideoSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { useState, useRef } from 'react'

type Props = {
  query: PostGalleryContentFragment$key,
  children?: () => void,
}

const PostGalleryContentFragmentGQL = graphql`
  fragment PostGalleryContentFragment on Post {
    content {
      type
      urls {
        url
        mimeType
      }
    }
  }
`

export default function PostGalleryContent ({ query, children }: Props): Node {
  const data = useFragment(PostGalleryContentFragmentGQL, query)

  const [volume, setVolume] = useState(0.2)
  const [muted, setMuted] = useState(true)

  const [swiper, setSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesCount = swiper?.slides?.length

  const onChangeSlides = (swiper) => {
    // Pause all videos when navigating away from them
    // and play current video as well as synchronizing audio
    setCurrentSlide(swiper.activeIndex)
    swiper.slides.forEach((item, index) => {
      const videoElement = item.getElementsByTagName('video') || []
      for (const video of videoElement) {
        video.volume = volume
        video.muted = muted
        if (swiper.activeIndex === index) {
          video.play()
          return
        }
        video.pause()
      }
    })
  }

  const onVolumeChange = (e) => {
    console.log(e.target.volume)
    setVolume(e.target.volume)
    setMuted(e.target.muted)
  }

  return (
    <>
      <Swiper
        autoHeight
        onSwiper={(swiper) =>
          setSwiper(swiper)}
        onSlideChange={(swiper) =>
          onChangeSlides(swiper)}
      >
        {data.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex bg='gray.800' justify='center' align='center' h={500}>
              {item.type === 'IMAGE' &&
                <ImageSnippet h='100%' urls={item.urls} />}
              {item.type === 'VIDEO' &&
                <VideoSnippet
                  autoPlay={index === currentSlide}
                  onVolumeChange={(e) =>
                    onVolumeChange(e)}
                  controls urls={item.urls}
                />}
            </Flex>
          </SwiperSlide>)}
      </Swiper>
      {children && children({ slidesCount, currentSlide })}
    </>
  )
}
