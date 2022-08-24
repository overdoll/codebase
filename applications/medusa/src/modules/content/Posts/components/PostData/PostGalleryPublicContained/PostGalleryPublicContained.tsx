import { graphql, useFragment } from 'react-relay'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryPublicContainedFragment$key } from '@//:artifacts/PostGalleryPublicContainedFragment.graphql'
import {
  PostGalleryPublicContainedViewerFragment$key
} from '@//:artifacts/PostGalleryPublicContainedViewerFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import SwiperType from 'swiper'
import { POST_SWIPER_PROPS } from '../../../constants'
import PostDetailedMedia from '../../PostPlayback/PostDetailedMedia/PostDetailedMedia'

interface Props {
  postQuery: PostGalleryPublicContainedFragment$key
  viewerQuery: PostGalleryPublicContainedViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostGalleryPublicContainedFragment on Post {
    club {
      ...PostSupporterContentClubFragment
    }
    content {
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
  fragment PostGalleryPublicContainedViewerFragment on Account {
    ...PostSupporterContentViewerFragment
  }
`

export default function PostGalleryPublicContained ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  const determineRows = postData.content.length > 10 ? '1fr 10vh' : (postData.content.length > 1 ? '1fr 5vh' : '1fr')

  return (
    <Grid gap={1} overflow='hidden' templateRows={determineRows} templateColumns='100%' h='100%'>
      <GridItem overflow='hidden' bg='green.400'>
        <Swiper
          {...POST_SWIPER_PROPS}
          onSwiper={(swiper) => setSwiper(swiper)}
          style={{
            height: '100%'
          }}
        >
          {postData.content.map((item, index) =>
            <SwiperSlide
              key={index}
            >
              <Flex
                direction='column'
                align='center'
                justify='center'
                h='100%'
              >
                <PostSupporterContent
                  viewerQuery={viewerData}
                  clubQuery={postData.club}
                  query={item}
                >
                  <PostDetailedMedia
                    imageProps={{
                      hideBackground: true,
                      keepWidth: true,
                      style: {
                        height: '100%'
                      }
                    }}
                    query={item.resource}
                  />
                </PostSupporterContent>
              </Flex>
            </SwiperSlide>)}
        </Swiper>
      </GridItem>
      <GridItem overflow='hidden' bg='purple.400'>
        <PostSlideIndex fillHeight swiper={swiper} query={postData} />
      </GridItem>
    </Grid>
  )
}
