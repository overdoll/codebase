import { graphql, useFragment } from 'react-relay'
import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryStaffDetailedFragment$key } from '@//:artifacts/PostGalleryStaffDetailedFragment.graphql'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import SwiperType from 'swiper'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS, POST_SWIPER_SLIDE_PROPS } from '../../../constants'
import PostShowOverflow from '../PostShowOverflow/PostShowOverflow'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'

interface Props {
  postQuery: PostGalleryStaffDetailedFragment$key
}

const PostFragment = graphql`
  fragment PostGalleryStaffDetailedFragment on Post {
    contributor {
      ...PostSupporterContentViewerFragment
    }
    club {
      ...PostSupporterContentClubFragment
    }
    content {
      resource {
        ...PostMediaFragment
      }
      ...PostSupporterContentFragment
      ...PostSlideBackgroundFragment
    }
    ...PostSlideIndexFragment
  }
`

export default function PostGalleryStaffDetailed ({
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  return (
    <Box>
      <Swiper
        {...POST_SWIPER_PROPS}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {postData.content.map((item, index) =>
          <SwiperSlide
            key={index}
            {...POST_SWIPER_SLIDE_PROPS}
          >
            <PostSlideBackground query={item}>
              <PostShowOverflow>
                <PostSupporterContent
                  viewerQuery={postData.contributor}
                  clubQuery={postData.club}
                  query={item}
                >
                  <PostMedia
                    controls={{
                      canSeek: true,
                      canFullscreen: true
                    }}
                    query={item.resource}
                  />
                </PostSupporterContent>
              </PostShowOverflow>
            </PostSlideBackground>
          </SwiperSlide>)}
      </Swiper>
      <PostSlideIndex swiper={swiper} query={postData} />
    </Box>
  )
}
