import { RouletteContentFragment$key } from '@//:artifacts/RouletteContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, Center, GridItem } from '@chakra-ui/react'
import CinematicCarousel from '../../Carousel/CinematicCarousel/CinematicCarousel'
import syncSwiperSlideChange from '../../../support/syncSwiperSlideChange'
import RouletteGallery from '../../Gallery/RouletteGallery/RouletteGallery'

interface Props {
  postQuery: RouletteContentFragment$key
}

const PostFragment = graphql`
  fragment RouletteContentFragment on Post {
    id
    content {
      __typename
    }
    ...RouletteGalleryFragment
    ...CinematicCarouselFragment
  }
`

export default function RouletteContent (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const onInit: OnSwiperInitType = (swiper) => {
    setSwiper(swiper)
  }

  syncSwiperSlideChange(swiper, setSwiper)

  return (
    <ContentGrid contentLength={postData.content.length} key={postData.id}>
      <GridItem overflow='hidden' area='gallery'>
        <Box h='100%' position='relative'>
          <RouletteGallery postQuery={postData} onSwiper={onInit} />
        </Box>
      </GridItem>
      {postData.content.length > 1 && (
        <GridItem overflow='hidden' area='carousel'>
          <Center h='100%' w='100%'>
            <CinematicCarousel swiper={swiper} postQuery={postData} />
          </Center>
        </GridItem>
      )}
    </ContentGrid>
  )
}
