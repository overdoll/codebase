import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import {
  PostGalleryPublicDetailedViewerFragment$key
} from '@//:artifacts/PostGalleryPublicDetailedViewerFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { NumberParam, useQueryParam } from 'use-query-params'
import { useState } from 'react'
import SwiperType from 'swiper'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS } from '../../../constants'
import PostDetailedMedia from '../../PostPlayback/PostDetailedMedia/PostDetailedMedia'

interface Props {
  postQuery: PostGalleryPublicDetailedFragment$key
  viewerQuery: PostGalleryPublicDetailedViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostGalleryPublicDetailedFragment on Post {
    club {
      ...PostSupporterContentClubFragment
    }
    content {
      id
      resource {
        ...PostDetailedMediaFragment
      }
      ...PostSupporterContentFragment
      ...PostSlideBackgroundFragment
    }
    ...PostSlideIndexFragment
  }
`

const ViewerFragment = graphql`
  fragment PostGalleryPublicDetailedViewerFragment on Account {
    ...PostSupporterContentViewerFragment
  }
`

export default function PostGalleryPublicDetailed ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  const [slide] = useQueryParam<number | null | undefined>('slide', NumberParam)

  const slideTo = (swiper): void => {
    if (slide != null) {
      swiper.slideTo(slide, 50)
    }
  }

  return (
    <Box>
      <Swiper
        {...POST_SWIPER_PROPS}
        onSwiper={(swiper) => setSwiper(swiper)}
        onAfterInit={(swiper) => slideTo(swiper)}
      >
        {postData.content.map((item, index) =>
          <SwiperSlide
            key={item.id}
            style={{
              height: 'auto',
              alignSelf: 'stretch'
            }}
          >
            <PostSlideBackground query={item}>
              <Flex
                direction='column'
                minH={200}
                w='100%'
                align='center'
                justify='center'
              >
                <PostSupporterContent
                  viewerQuery={viewerData}
                  clubQuery={postData.club}
                  query={item}
                >
                  <PostDetailedMedia
                    query={item.resource}
                  />
                </PostSupporterContent>
              </Flex>
            </PostSlideBackground>
          </SwiperSlide>)}
      </Swiper>
      <PostSlideIndex swiper={swiper} query={postData} />
    </Box>
  )
}
