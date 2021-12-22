import { graphql, useFragment } from 'react-relay'
import type { PostGalleryContentFragment$key } from '@//:artifacts/PostGalleryContentFragment.graphql'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '@//:modules/content/DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '@//:modules/content/DataDisplay/Snippets/VideoSnippet/VideoSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { useState } from 'react'

interface ChildType {
  slidesCount: number
  currentSlide: number
}

interface Props {
  query: PostGalleryContentFragment$key
  children?: (ChildType: ChildType) => void
}

const PostGalleryContentFragmentGQL = graphql`
  fragment PostGalleryContentFragment on Post {
    content {
      type
      ...ImageSnippetFragment
      ...VideoSnippetFragment
    }
  }
`

export default function PostGalleryContent ({
  query,
  children
}: Props): JSX.Element {
  const data = useFragment(PostGalleryContentFragmentGQL, query)

  const [volume, setVolume] = useState(0.2)
  const [muted, setMuted] = useState(true)

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesCount = swiper?.slides.length ?? 0

  const onChangeSlides = (swiper): void => {
    // Pause all videos when navigating away from them
    // and play current video as well as synchronizing audio
    setCurrentSlide(swiper.activeIndex)
    swiper.slides.forEach((item, index) => {
      const videoElement = item.getElementsByTagName('video') ?? []
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

  const onVolumeChange = (e): void => {
    setVolume(e.target.volume)
    setMuted(e.target.muted)
  }

  return (
    <Box>
      <Swiper
        observer
        observeParents
        autoHeight
        onSwiper={(swiper) =>
          setSwiper(swiper)}
        onSlideChange={(swiper) =>
          onChangeSlides(swiper)}

      >
        {data.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex bg='gray.800' justify='center' align='center' h={500}>
              <Flex h='100%'>
                {item.type === 'IMAGE' &&
                  <ImageSnippet h='100%' query={item} />}
                {item.type === 'VIDEO' &&
                  <VideoSnippet
                    h='100%'
                    autoPlay={index === currentSlide}
                    onVolumeChange={(e) =>
                      onVolumeChange(e)}
                    controls
                    query={item}
                  />}
              </Flex>
            </Flex>
          </SwiperSlide>)}
      </Swiper>
      {children?.({
        slidesCount,
        currentSlide
      })}
    </Box>
  )
}
