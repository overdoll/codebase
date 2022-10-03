import { RouletteContentFragment$key } from '@//:artifacts/RouletteContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import CinematicCarousel from '../../Carousel/CinematicCarousel/CinematicCarousel'
import syncSwiperSlideChange from '../../../support/syncSwiperSlideChange'
import RouletteGallery from '../../Gallery/RouletteGallery/RouletteGallery'
import useAbility from '../../../../../../authorization/useAbility'
import ViewCounterPostObserver from '@//:domain/app/Root/DisposeRoot/ResultRoot/ViewCounter/ViewCounterPostObserver'

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

  const ability = useAbility()

  const onInit: OnSwiperInitType = (swiper) => {
    setSwiper(swiper)
  }

  syncSwiperSlideChange(swiper, setSwiper)

  return (
    <ContentGrid contentLength={postData.content.length} key={postData.id}>
      <GridItem overflow='hidden' area='gallery'>
        <Box h='100%' position='relative'>
          {ability.can('configure', 'Account') && (
            <ViewCounterPostObserver
              delay={5000}
              postId={postData.id}
            />)}
          <RouletteGallery postQuery={postData} onSwiper={onInit} />
        </Box>
      </GridItem>
      {postData.content.length > 1 && (
        <GridItem overflow='hidden' area='carousel'>
          <CinematicCarousel swiper={swiper} postQuery={postData} />
        </GridItem>
      )}
    </ContentGrid>
  )
}
