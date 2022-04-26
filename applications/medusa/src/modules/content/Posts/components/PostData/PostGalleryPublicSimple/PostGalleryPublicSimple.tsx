import { graphql, useFragment } from 'react-relay'
import { Box, Stack } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../support/PostVideoManager/PostVideoManager'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostSimpleMedia from '../../PostMedia/PostSimpleMedia/PostSimpleMedia'
import { Link } from '../../../../../routing'

interface Props {
  query: PostGalleryPublicSimpleFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    id
    reference
    content {
      resource {
        ...PostSimpleMediaFragment
      }
      ...PostSupporterContentFragment
    }
    club {
      slug
      ...PostSupporterContentClubFragment
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
    onInitialize
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={1}>
      <Box>
        <Swiper
          observer
          speed={100}
          onSwiper={(swiper) =>
            onInitialize(swiper)}
          onObserverUpdate={(swiper) => onInitialize(swiper)}
        >
          {data?.content.map((item, index) =>
            <SwiperSlide
              key={index}
            >
              <Link
                href={{
                  pathname: '/[slug]/post/[reference]',
                  query: {
                    slug: data.club.slug,
                    reference: data?.reference
                  }
                }}
              >
                <Box
                  bg="gray.800"
                  w="100%"
                  cursor="pointer"
                  minH={300}
                  maxH={800}
                >
                  <PostSupporterContent
                    query={item}
                    clubQuery={data.club}
                  >
                    <PostSimpleMedia
                      query={item.resource}
                      index={index}
                      reference={data.reference}
                    />
                  </PostSupporterContent>
                </Box>
              </Link>
            </SwiperSlide>
          )}
        </Swiper>
      </Box>
    </Stack>
  )
}
