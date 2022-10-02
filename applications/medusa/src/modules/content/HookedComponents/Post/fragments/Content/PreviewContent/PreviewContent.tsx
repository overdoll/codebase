import { PreviewContentFragment$key } from '@//:artifacts/PreviewContentFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { OnSwiperInitType } from '../../../types'
import { useState } from 'react'
import SwiperType from 'swiper'
import ContentGrid from '../../../components/ContentGrid/ContentGrid'
import { Box, GridItem } from '@chakra-ui/react'
import PreviewGallery from '../../Gallery/PreviewGallery/PreviewGallery'
import PreviewCarousel from '../../Carousel/PreviewCarousel/PreviewCarousel'
import { OnPlayerInitType } from '../../../../Media/types'

interface Props {
  postQuery: PreviewContentFragment$key
  onSwiper?: OnSwiperInitType
  onPlayerInit?: OnPlayerInitType
}

const PostFragment = graphql`
  fragment PreviewContentFragment on Post {
    id
    content {
      __typename
    }
    ...PreviewGalleryFragment
    ...PreviewCarouselFragment
  }
`

export default function PreviewContent (props: Props): JSX.Element {
  const {
    postQuery,
    onSwiper,
    onPlayerInit
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const onSwiperInit: OnSwiperInitType = (swiper) => {
    onSwiper?.(swiper)
    setSwiper(swiper)
  }

  return (
    <ContentGrid position='relative' contentLength={postData.content.length} key={postData.id}>
      <GridItem overflow='hidden' area='gallery'>
        <Box h='100%' position='relative'>
          <PreviewGallery postQuery={postData} onSwiper={onSwiperInit} onPlayerInit={onPlayerInit} />
        </Box>
      </GridItem>
      <GridItem
        pointerEvents='auto'
        overflow='hidden'
        area='carousel'
      >
        <PreviewCarousel swiper={swiper} postQuery={postData} />
      </GridItem>
    </ContentGrid>
  )
}
