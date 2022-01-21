import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../helpers/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../helpers/GlobalVideoManager/GlobalVideoManager'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import ControlledVideo from '../../ControlledVideo/ControlledVideo'

interface Props {
  query: PostGalleryPublicDetailedFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicDetailedFragment on Post {
    id
    reference
    content {
      type
      ...ImageSnippetFragment
      ...ControlledVideoFragment
    }
  }
`

export default function PostGalleryPublicDetailed ({
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
    onVideoInitialize
  } = useContext(PostVideoManagerContext)

  return (
    <Box>
      <Swiper
        autoHeight
        onSwiper={(swiper) =>
          onInitialize(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Flex h='100%' align='center' justify='center'>
              {item.type === 'IMAGE' &&
                <ImageSnippet query={item} />}
              {item.type === 'VIDEO' &&
                <ControlledVideo
                  controls={{
                    canSeek: true,
                    canFullscreen: true
                  }}
                  onPlay={(paused, target) => onVideoPlay(data?.reference, paused, target)}
                  onPause={(paused, target) => onVideoPlay(data?.reference, paused, target)}
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
