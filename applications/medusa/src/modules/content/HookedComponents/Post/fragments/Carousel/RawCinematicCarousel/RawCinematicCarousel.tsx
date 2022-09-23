import { RawCinematicCarouselFragment$key } from '@//:artifacts/RawCinematicCarouselFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import SwiperType from 'swiper'
import CarouselGrid from '../../../components/CarouselGrid/CarouselGrid'
import CarouselGridItem from '../../../components/CarouselGridItem/CarouselGridItem'
import RawThumbnailCarouselItem from '../RawThumbnailCarouselItem/RawThumbnailCarouselItem'

interface Props {
  postQuery: RawCinematicCarouselFragment$key
  swiper: SwiperType | null
}

const PostFragment = graphql`
  fragment RawCinematicCarouselFragment on Post {
    id
    content {
      id
      media {
        ...RawThumbnailCarouselItemFragment
      }
    }
  }
`

export default function RawCinematicCarousel (props: Props): JSX.Element {
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
        >
          <RawThumbnailCarouselItem mediaQuery={item.media} />
        </CarouselGridItem>
      ))}
    </CarouselGrid>
  )
}
