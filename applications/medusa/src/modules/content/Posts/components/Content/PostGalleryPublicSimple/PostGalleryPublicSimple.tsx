import { graphql, useFragment } from 'react-relay'
import { Box, Flex, Stack } from '@chakra-ui/react'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../helpers/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../helpers/GlobalVideoManager/GlobalVideoManager'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import ControlledVideo from '../../ControlledVideo/ControlledVideo'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { Link } from '../../../../../routing'

interface Props {
  query: PostGalleryPublicSimpleFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    id
    reference
    content {
      type
      ...ImageSnippetFragment
      ...ControlledVideoFragment
    }
    ...PostClickableCategoriesFragment
    ...PostClickableCharactersFragment
  }
`

export default function PostGalleryPublicSimple ({
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
        onObserverUpdate={(swiper) => onInitialize(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Flex h='72vh' align='center' justify='center'>
              {item.type === 'IMAGE' &&
                <ImageSnippet h='100%' query={item} />}
              {item.type === 'VIDEO' &&
                <ControlledVideo
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
        <SwiperSlide>
          <Stack h='72vh' align='center' justify='center' spacing={2}>
            <Link to={`/p/${data?.reference as string}`}>
              <Button size='lg' colorScheme='primary'>
                <Trans>
                  View Post
                </Trans>
              </Button>
            </Link>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
