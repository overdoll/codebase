import { CinematicContentFragment$key } from '@//:artifacts/CinematicContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import CinematicGallery from '../../Gallery/CinematicGallery/CinematicGallery'
import CinematicCarousel from '../../Carousel/CinematicCarousel/CinematicCarousel'

interface Props {
  postQuery: CinematicContentFragment$key
}

const PostFragment = graphql`
  fragment CinematicContentFragment on Post {
    id
    content {
      __typename
    }
    ...CinematicGalleryFragment
    ...CinematicCarouselFragment
  }
`

export default function CinematicContent (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const onInit: OnSwiperInitType = (swiper) => {
    setSwiper(swiper)
  }

  return (
    <ContentGrid contentLength={postData.content.length} key={postData.id}>
      <GridItem overflow='hidden' area='gallery'>
        <Box h='100%' position='relative'>
          <CinematicGallery postQuery={postData} onSwiper={onInit} />
        </Box>
      </GridItem>
      <GridItem overflow='hidden' area='carousel'>
        <CinematicCarousel swiper={swiper} postQuery={postData} />
      </GridItem>
    </ContentGrid>
  )
}
