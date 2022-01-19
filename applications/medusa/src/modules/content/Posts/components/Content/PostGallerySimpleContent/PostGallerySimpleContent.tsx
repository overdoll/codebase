import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext, useEffect } from 'react'
import { PostVideoManagerContext } from '../../../helpers/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../helpers/GlobalVideoManager/GlobalVideoManager'
import { PostGallerySimpleContentFragment$key } from '@//:artifacts/PostGallerySimpleContentFragment.graphql'
import ControlledVideo from '../../../../DataDisplay/ControlledVideo/ControlledVideo'

interface Props {
  query: PostGallerySimpleContentFragment$key | null
}

const Fragment = graphql`
  fragment PostGallerySimpleContentFragment on Post {
    id
    content {
      type
      ...ImageSnippetFragment
      ...ControlledVideoFragment
    }
  }
`

export default function PostGallerySimpleContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    changeVideoVolume,
    changeVideoMuted,
    onVideoPlay,
    videoMuted,
    videoVolume
  } = useContext(GlobalVideoManagerContext)

  const {
    onInitialize,
    onVideoInitialize,
    setIdentifier
  } = useContext(PostVideoManagerContext)

  useEffect(() => {
    if (data?.id == null) return
    setIdentifier(data.id)
  }, [data?.id])

  return (
    <Box bg='gray.800'>
      <Swiper
        observer
        onSwiper={(swiper) =>
          onInitialize(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex minH={200} maxH={700} bg='gray.800'>
              {item.type === 'IMAGE' &&
                <ImageSnippet query={item} />}
              {item.type === 'VIDEO' &&
                <ControlledVideo
                  onPlay={(paused, target) => onVideoPlay(data?.id, paused, target)}
                  onPause={(paused, target) => onVideoPlay(data?.id, paused, target)}
                  onInitialize={(target) => onVideoInitialize(target, index)}
                  volume={videoVolume}
                  isMuted={videoMuted}
                  onMute={changeVideoMuted}
                  onVolumeChange={changeVideoVolume}
                  query={item}
                />}
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
