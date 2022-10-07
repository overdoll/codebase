import { PreviewCarouselFragment$key } from '@//:artifacts/PreviewCarouselFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import SwiperType from 'swiper'
import CarouselGrid from '../../../components/CarouselGrid/CarouselGrid'
import CarouselGridItem from '../../../components/CarouselGridItem/CarouselGridItem'
import ThumbnailCarouseItem from '../ThumbnailCarouselItem/ThumbnailCarouseItem'

interface Props {
  postQuery: PreviewCarouselFragment$key
  swiper: SwiperType | null
}

const PostFragment = graphql`
  fragment PreviewCarouselFragment on Post {
    id
    content {
      id
      media {
        ...ThumbnailCarouseItemFragment
      }
      isSupporterOnly
    }
  }
`

export default function PreviewCarousel (props: Props): JSX.Element {
  const {
    postQuery,
    swiper
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <CarouselGrid galleryLength={postData.content.length}>
      {postData.content.map((item, index) => (
        <CarouselGridItem
          key={item.id}
          swiper={swiper}
          index={index}
          isSupporter={item.isSupporterOnly}
        >
          <ThumbnailCarouseItem
            isSupporter={item.isSupporterOnly}
            mediaQuery={item.media}
          />
        </CarouselGridItem>
      ))}
    </CarouselGrid>
  )
}
