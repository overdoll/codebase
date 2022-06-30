import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { NumberParam, useQueryParam } from 'use-query-params'
import { useState } from 'react'
import SwiperType from 'swiper'

interface Props {
  query: PostGalleryPublicDetailedFragment$key
}

const Fragment = graphql`
  fragment PostGalleryPublicDetailedFragment on Post {
    club {
      ...PostSupporterContentClubFragment
    }
    content {
      resource {
        preview
        ...PostMediaFragment
      }
      ...PostSupporterContentFragment
    }
    ...PostSlideIndexFragment
  }
`

export default function PostGalleryPublicDetailed ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

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
        grabCursor
        spaceBetween={20}
        speed={100}
        onSwiper={(swiper) => setSwiper(swiper)}
        onAfterInit={(swiper) => slideTo(swiper)}
      >
        {data.content.map((item, index) =>
          <SwiperSlide
            key={index}
            style={{
              backgroundColor: item.resource.preview != null && item.resource.preview !== '' ? item.resource.preview : 'gray.800',
              height: swiper?.height
            }}
          >
            <Flex
              h='100%'
              w='100%'
              align='center'
              justify='center'
            >
              <Flex
                direction='column'
                minH={300}
                w='100%'
                align='center'
                justify='center'
              >
                <PostSupporterContent
                  clubQuery={data.club}
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
              </Flex>
            </Flex>
          </SwiperSlide>)}
      </Swiper>
      {swiper != null && <PostSlideIndex swiper={swiper} query={data} />}
    </Box>
  )
}
