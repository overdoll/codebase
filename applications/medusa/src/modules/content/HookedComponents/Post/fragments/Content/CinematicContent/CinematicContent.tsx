import { CinematicContentFragment$key } from '@//:artifacts/CinematicContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import CinematicGallery from '../../Gallery/CinematicGallery/CinematicGallery'
import CinematicCarousel from '../../Carousel/CinematicCarousel/CinematicCarousel'
import syncSwiperSlideChange from '../../../support/syncSwiperSlideChange'
import useAbility from '../../../../../../authorization/useAbility'
import ViewCounterPostObserver from '@//:domain/app/Root/DisposeRoot/ResultRoot/ViewCounter/ViewCounterPostObserver'

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
              delay={1000}
              postId={postData.id}
            />)}
          <CinematicGallery postQuery={postData} onSwiper={onInit} />
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
