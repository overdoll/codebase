import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperType from 'swiper'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'

import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import { Link } from '../../../../../routing'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import OverflowVisual from './OverflowVisual/OverflowVisual'

interface Props {
  query: PostGalleryPublicSimpleFragment$key
}

const Fragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    reference
    content {
      resource {
        ...PostMediaFragment
        preview
      }
      ...PostSupporterContentFragment
    }
    club {
      slug
      ...PostSupporterContentClubFragment
    }
    ...PostSlideIndexFragment
  }
`

export default function PostGalleryPublicSimple ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  return (
    <Box>
      <Swiper
        grabCursor
        spaceBetween={20}
        speed={100}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {data?.content.map((item, index) =>
          <SwiperSlide
            key={index}
            style={{
              backgroundColor: item.resource.preview != null && item.resource.preview !== '' ? item.resource.preview : 'gray.800'
            }}
          >
            <Flex
              h='100%'
              w='100%'
              align='center'
              justify='center'
              cursor='pointer'
            >
              <OverflowVisual
                minH={300}
                maxH={700}
                align='center'
                justify='center'
              >
                <PostSupporterContent
                  query={item}
                  clubQuery={data.club}
                >
                  <Link
                    href={{
                      pathname: '/[slug]/post/[reference]',
                      query: {
                        slug: data.club.slug,
                        reference: data?.reference,
                        ...(index > 0 && { slide: index })
                      }
                    }}
                    passHref
                  >
                    <Box w='100%' h='100%' as='a'>
                      <PostMedia controls={{ canControl: false }} query={item.resource} />
                    </Box>
                  </Link>
                </PostSupporterContent>
              </OverflowVisual>
            </Flex>
          </SwiperSlide>
        )}
      </Swiper>
      {swiper != null && <PostSlideIndex swiper={swiper} query={data} />}
    </Box>
  )
}
