import { RawCinematicContentFragment$key } from '@//:artifacts/RawCinematicContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import RawCinematicGallery from '../../Gallery/RawCinematicGallery/RawCinematicGallery'
import RawCinematicCarousel from '../../Carousel/RawCinematicCarousel/RawCinematicCarousel'

interface Props {
  postQuery: RawCinematicContentFragment$key
}

const PostFragment = graphql`
  fragment RawCinematicContentFragment on Post {
    id
    content {
      __typename
    }
    ...RawCinematicGalleryFragment
    ...RawCinematicCarouselFragment
  }
`

export default function RawCinematicContent (props: Props): JSX.Element {
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
        <Box position='relative'>
          <RawCinematicGallery postQuery={postData} onSwiper={onInit} />
        </Box>
      </GridItem>
      <GridItem overflow='hidden' area='carousel'>
        <RawCinematicCarousel swiper={swiper} postQuery={postData} />
      </GridItem>
    </ContentGrid>
  )
}
