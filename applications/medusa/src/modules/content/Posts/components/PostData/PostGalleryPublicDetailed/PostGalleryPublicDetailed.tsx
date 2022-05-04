import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { NumberParam, useQueryParam } from 'use-query-params'

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
        onAfterInit={(swiper) => slideTo(swiper)}
      >
        <PostSlideIndex query={data} />
        {data.content.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Flex minH={300} bg='gray.800' w='100%' align='center' justify='center'>
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
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
