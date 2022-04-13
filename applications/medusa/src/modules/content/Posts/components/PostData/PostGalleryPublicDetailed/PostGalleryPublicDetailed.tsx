import { graphql, useFragment } from 'react-relay'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../support/PostVideoManager/PostVideoManager'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import PostMedia from '../../PostMedia/PostMedia'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'

interface Props {
  query: PostGalleryPublicDetailedFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicDetailedFragment on Post {
    id
    reference
    club {
      ...PostSupporterContentClubFragment
    }
    content {
      resource {
        ...PostMediaFragment
      }
      ...PostSupporterContentFragment
    }
  }
`

export default function PostGalleryPublicDetailed ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    onInitialize
  } = useContext(PostVideoManagerContext)

  return (
    <Box>
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
            <Flex minH={400} bg='gray.800' w='100%' align='center' justify='center'>
              <Stack spacing={1}>
                <PostSupporterContent
                  clubQuery={data.club}
                  query={item}
                >
                  <PostMedia query={item.resource} index={index} reference={data.reference} />
                </PostSupporterContent>
              </Stack>
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
