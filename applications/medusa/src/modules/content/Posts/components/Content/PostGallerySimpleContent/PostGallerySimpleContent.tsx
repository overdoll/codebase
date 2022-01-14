import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../../../../DataDisplay/Snippets/VideoSnippet/VideoSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { useContext } from 'react'
import { PostManagerContext } from '../../../helpers/PostManager/PostManager'
import { VideoManagerContext } from '../../../helpers/VideoManager/VideoManager'
import { PostGallerySimpleContentFragment$key } from '@//:artifacts/PostGallerySimpleContentFragment.graphql'

interface Props {
  query: PostGallerySimpleContentFragment$key | null
}

const Fragment = graphql`
  fragment PostGallerySimpleContentFragment on Post {
    content {
      type
      ...ImageSnippetFragment
      ...VideoSnippetFragment
    }
  }
`

export default function PostGallerySimpleContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    currentSlide,
    onSlideChange,
    onInitialize
  } = useContext(PostManagerContext)

  const { changeVideoVolume } = useContext(VideoManagerContext)

  // TODO if there is a video show a non-interactable transparent scrobble
  // TODO at the very bottom

  // TODO if content overflows show a shadow

  return (
    <Box>
      <Swiper
        observer
        observeParents
        autoHeight
        onSwiper={(swiper) =>
          onInitialize(swiper)}
        onSlideChange={(swiper) =>
          onSlideChange(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex minH={200} maxH={700} bg='gray.800'>
              {item.type === 'IMAGE' &&
                <ImageSnippet query={item} />}
              {item.type === 'VIDEO' &&
                <VideoSnippet
                  autoPlay={index === currentSlide}
                  onVolumeChange={(e) =>
                    changeVideoVolume(e)}
                  query={item}
                />}
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
