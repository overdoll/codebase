import { graphql, useFragment } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../helpers/PostVideoManager/PostVideoManager'
import { PostGalleryPublicDetailedFragment$key } from '@//:artifacts/PostGalleryPublicDetailedFragment.graphql'
import PostMedia from '../../PostMedia/PostMedia'

interface Props {
  query: PostGalleryPublicDetailedFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicDetailedFragment on Post {
    id
    reference
    content {
      resource {
        ...PostMediaFragment
      }
      
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
              <PostMedia query={item.resource} index={index} reference={data.reference} />
            </Flex>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
