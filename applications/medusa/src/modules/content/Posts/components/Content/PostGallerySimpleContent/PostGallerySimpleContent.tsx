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

  return (
    <Box h='100%'>
      <Swiper
        observer
        observeParents
        onSwiper={(swiper) =>
          onInitialize(swiper)}
        onSlideChange={(swiper) =>
          onSlideChange(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex justify='center' minH={400} maxH={700} align='center' bg='gray.800' h='100%'>
              {item.type === 'IMAGE' &&
                <ImageSnippet h='100%' query={item} />}
              {item.type === 'VIDEO' &&
                <VideoSnippet
                  h='100%'
                  autoPlay={index === currentSlide}
                  onVolumeChange={(e) =>
                    changeVideoVolume(e)}
                  controls
                  query={item}
                />}
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
