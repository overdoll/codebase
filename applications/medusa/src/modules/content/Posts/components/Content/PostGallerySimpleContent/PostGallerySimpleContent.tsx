import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { useContext } from 'react'
import { PostManagerContext } from '../../../helpers/PostManager/PostManager'
import { VideoManagerContext } from '../../../helpers/VideoManager/VideoManager'
import { PostGallerySimpleContentFragment$key } from '@//:artifacts/PostGallerySimpleContentFragment.graphql'
import ControlledVideo from '../../../../DataDisplay/ControlledVideo/ControlledVideo'

interface Props {
  query: PostGallerySimpleContentFragment$key | null
}

const Fragment = graphql`
  fragment PostGallerySimpleContentFragment on Post {
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
    onInitialize
  } = useContext(PostManagerContext)

  const {
    videoMuted,
    changeVideoVolume,
    changeVideoMuted,
    onVideoRun
  } = useContext(VideoManagerContext)

  // TODO if content overflows show a shadow

  const onVolumeChange = ({
    muted,
    volume
  }): void => {
    changeVideoMuted(muted)
    changeVideoVolume(volume)
  }

  return (
    <Box>
      <Swiper
        observer
        observeParents
        autoHeight
        onSwiper={(swiper) =>
          onInitialize(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex align='center' minH={200} maxH={700} bg='gray.800'>
              {item.type === 'IMAGE' &&
                <ImageSnippet query={item} />}
              {item.type === 'VIDEO' &&
                <ControlledVideo
                  isMuted={videoMuted}
                  onPlay={(e) => onVideoRun(e)}
                  onVolumeChange={({
                    muted,
                    volume
                  }) =>
                    onVolumeChange({
                      muted,
                      volume
                    })}
                  query={item}
                />}
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
