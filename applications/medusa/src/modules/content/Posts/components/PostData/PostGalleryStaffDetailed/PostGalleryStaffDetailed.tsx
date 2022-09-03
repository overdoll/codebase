import { graphql, useFragment } from 'react-relay'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryStaffDetailedFragment$key } from '@//:artifacts/PostGalleryStaffDetailedFragment.graphql'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import SwiperType from 'swiper'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS, POST_SWIPER_SLIDE_PROPS } from '../../../constants'
import PostShowOverflow from '../PostShowOverflow/PostShowOverflow'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import { Trans } from '@lingui/macro'
import PostDetailedMedia from '../../PostPlayback/PostDetailedMedia/PostDetailedMedia'

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
      id
      resource {
        processed
        ...PostDetailedMediaFragment
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
        {postData.content.map((item) =>
          <SwiperSlide
            key={item.id}
            {...POST_SWIPER_SLIDE_PROPS}
          >
            {!item.resource.processed
              ? (
                <Flex
                  bg='gray.800'
                  h='400px'
                  w='100%'
                  align='center'
                  justify='center'
                  overflow='hidden'
                >
                  <Text textAlign='center'>
                    <Trans>
                      Preview is only available once content is processed. You may submit your post at this stage, and
                      we
                      will
                      notify you if there are any issues.
                    </Trans>
                  </Text>
                </Flex>
                )
              : (
                <PostSlideBackground query={item}>
                  <PostShowOverflow>
                    <PostSupporterContent
                      viewerQuery={postData.contributor}
                      clubQuery={postData.club}
                      query={item}
                    >
                      <PostDetailedMedia
                        query={item.resource}
                      />
                    </PostSupporterContent>
                  </PostShowOverflow>
                </PostSlideBackground>
                )}
          </SwiperSlide>)}
      </Swiper>
      <PostSlideIndex swiper={swiper} query={postData} />
    </Box>
  )
}
