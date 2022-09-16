import { PreviewContentFragment$key } from '@//:artifacts/PreviewContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import CinematicCarousel from '../../Carousel/CinematicCarousel/CinematicCarousel'
import PreviewGallery from '../../Gallery/PreviewGallery/PreviewGallery'

interface Props {
  postQuery: PreviewContentFragment$key
}

const PostFragment = graphql`
  fragment PreviewContentFragment on Post {
    id
    content {
      __typename
    }
    ...PreviewGalleryFragment
    ...CinematicCarouselFragment
  }
`

export default function PreviewContent (props: Props): JSX.Element {
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
        <Box w='100%' h='100%' position='relative'>
          <PreviewGallery postQuery={postData} onSwiper={onInit} />
        </Box>
      </GridItem>
      <GridItem overflow='hidden' area='carousel'>
        <CinematicCarousel swiper={swiper} postQuery={postData} />
      </GridItem>
    </ContentGrid>
  )
}
