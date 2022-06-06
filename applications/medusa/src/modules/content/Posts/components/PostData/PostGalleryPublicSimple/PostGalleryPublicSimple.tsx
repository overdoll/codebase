import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import { Link } from '../../../../../routing'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'

interface Props {
  query: PostGalleryPublicSimpleFragment$key
}

const Fragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    reference
    content {
      resource {
        ...PostMediaFragment
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

  return (
    <Box>
      <Swiper
        grabCursor
        spaceBetween={20}
        speed={100}
      >
        <PostSlideIndex query={data} />
        {data?.content.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Flex
              direction='column'
              bg='gray.800'
              w='100%'
              cursor='pointer'
              align='center'
              justify='center'
              minH={300}
              maxH={800}
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
                  <Box as='a'>
                    <PostMedia controls={{ canControl: false }} query={item.resource} />
                  </Box>
                </Link>
              </PostSupporterContent>
            </Flex>
          </SwiperSlide>
        )}
      </Swiper>
    </Box>
  )
}
