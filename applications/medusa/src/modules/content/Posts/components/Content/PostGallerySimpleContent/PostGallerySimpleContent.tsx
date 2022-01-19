import { graphql, useFragment } from 'react-relay'
import { Box, Flex, Stack } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../helpers/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../helpers/GlobalVideoManager/GlobalVideoManager'
import { PostGallerySimpleContentFragment$key } from '@//:artifacts/PostGallerySimpleContentFragment.graphql'
import ControlledVideo from '../../../../DataDisplay/ControlledVideo/ControlledVideo'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import PostClickableCharacters from '../../Interaction/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories from '../../Interaction/PostClickableCategories/PostClickableCategories'

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
    ...PostClickableCategoriesFragment
    ...PostClickableCharactersFragment
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
    onVideoInitialize
  } = useContext(PostVideoManagerContext)

  return (
    <Box bg='gray.800'>
      <Swiper
        observer
        onSwiper={(swiper) =>
          onInitialize(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide key={index}>
            <Flex minH={200} maxH={700} align='center' justify='center'>
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
        <SwiperSlide>
          <Stack h={300} align='center' justify='center' spacing={2}>
            <PostClickableCharacters query={data} />
            <PostClickableCategories query={data} />
            <Button size='lg' colorScheme='primary'>
              <Trans>
                View Post
              </Trans>
            </Button>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
